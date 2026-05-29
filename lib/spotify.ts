/**
 * Spotify — Recently played, fetched server-side.
 *
 * Uses the Web API refresh-token grant (no per-user OAuth dance at runtime).
 * Long-lived refresh token + client id/secret live in env vars:
 *   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 *
 * Caching:
 *   Recently-played fetch uses next.revalidate=300 (5 min).
 *   Token fetch (POST) is uncached by Next; it only fires when the
 *   recent-played cache misses, so cost is ~1 token call per 5 min.
 *
 * Fallback:
 *   Any missing env var, non-2xx response, or thrown error returns
 *   { source: 'fallback', tracks: [] } so callers can swap in static data.
 *
 * Runtime: Edge-safe (uses btoa, no Node Buffer).
 */

export type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  when: string;
  artworkUrl: string | null;
  spotifyUrl: string;
};

export type RecentlyPlayedLive = {
  source: 'live';
  fetchedAt: string;
  tracks: SpotifyTrack[];
};

export type RecentlyPlayedFallback = {
  source: 'fallback';
  fetchedAt: string;
  tracks: SpotifyTrack[];
  reason: string;
};

export type RecentlyPlayedResponse = RecentlyPlayedLive | RecentlyPlayedFallback;

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=5';

async function getAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string | null> {
  const basic = btoa(`${clientId}:${clientSecret}`);
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
    cache: 'no-store',
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

function formatWhen(playedAtIso: string, nowMs = Date.now()): string {
  const playedMs = new Date(playedAtIso).getTime();
  const diffMin = Math.max(0, Math.round((nowMs - playedMs) / 60000));
  if (diffMin < 1) return 'now';
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d`;
}

type SpotifyApiResponse = {
  items?: Array<{
    track: {
      id: string;
      name: string;
      artists: Array<{ name: string }>;
      album: { name: string; images: Array<{ url: string }> };
      external_urls: { spotify: string };
    };
    played_at: string;
  }>;
};

export async function getRecentlyPlayed(): Promise<RecentlyPlayedResponse> {
  const fetchedAt = new Date().toISOString();
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      source: 'fallback',
      fetchedAt,
      tracks: [],
      reason: 'missing-credentials',
    };
  }

  try {
    const token = await getAccessToken(clientId, clientSecret, refreshToken);
    if (!token) {
      return { source: 'fallback', fetchedAt, tracks: [], reason: 'token-refresh-failed' };
    }

    const res = await fetch(RECENT_URL, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return {
        source: 'fallback',
        fetchedAt,
        tracks: [],
        reason: `spotify-${res.status}`,
      };
    }

    const json = (await res.json()) as SpotifyApiResponse;
    const tracks: SpotifyTrack[] = (json.items ?? []).map((item) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(', '),
      album: item.track.album.name,
      when: formatWhen(item.played_at),
      artworkUrl: item.track.album.images?.[0]?.url ?? null,
      spotifyUrl: item.track.external_urls?.spotify ?? 'https://open.spotify.com',
    }));

    return { source: 'live', fetchedAt, tracks };
  } catch {
    return { source: 'fallback', fetchedAt, tracks: [], reason: 'fetch-failed' };
  }
}
