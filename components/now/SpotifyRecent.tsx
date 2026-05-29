import nowData from '@/data/now.json';
import { getRecentlyPlayed, type SpotifyTrack } from '@/lib/spotify';

/**
 * Spotify "Recently played"
 *
 * Async Server Component that calls the lib/spotify helper directly
 * (no HTTP round-trip to /api/spotify/recently-played - that route exists
 * for external/client-side use). Cache lifetime is owned by the helper's
 * fetch revalidate, so the function returning here is cheap on hot paths.
 *
 * When env vars are missing OR the Spotify API errors, falls back to the
 * curated track list in data/now.json. The "synced X ago" label switches
 * to "from the playlist" so the fallback is visibly distinct.
 */

const SPOTIFY_PROFILE_URL = 'https://open.spotify.com/user/jvermaelen';

const FALLBACK_TRACKS: SpotifyTrack[] = nowData.tracks.map((t, i) => ({
  id: `fallback-${i}`,
  title: t.title,
  artist: t.artist,
  album: '',
  when: t.when,
  artworkUrl: null,
  spotifyUrl: SPOTIFY_PROFILE_URL,
}));

function formatSyncedAgo(fetchedAtIso: string, nowMs = Date.now()): string {
  const fetchedMs = new Date(fetchedAtIso).getTime();
  const diffMin = Math.max(0, Math.round((nowMs - fetchedMs) / 60000));
  if (diffMin < 1) return 'synced just now';
  if (diffMin < 60) return `synced ${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  return `synced ${diffHr}h ago`;
}

export async function SpotifyRecent() {
  const data = await getRecentlyPlayed();
  const isLive = data.source === 'live' && data.tracks.length > 0;
  const tracks = isLive ? data.tracks : FALLBACK_TRACKS;
  const liveLabel = isLive ? formatSyncedAgo(data.fetchedAt) : 'from the playlist';
  const footLabel = isLive ? 'via Spotify Web API' : 'curated · live feed reconnecting';

  return (
    <div className="spotify-card">
      <div className="spotify-head">
        <div className="title">Recently played</div>
        <div className="live">{liveLabel}</div>
      </div>
      <ol className="track-list">
        {tracks.map((track) => (
          <li key={track.id} className="track">
            <div className="track-art" aria-hidden="true">
              art
            </div>
            <div className="track-meta">
              <div className="track-title">{track.title}</div>
              <div className="track-artist">{track.artist}</div>
            </div>
            <div className="track-when">{track.when}</div>
          </li>
        ))}
      </ol>
      <div className="spotify-foot">
        <span>{footLabel}</span>
        <a href={SPOTIFY_PROFILE_URL}>open profile ↗</a>
      </div>
    </div>
  );
}
