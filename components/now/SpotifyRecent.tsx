import nowData from '@/data/now.json';

/**
 * Spotify "Recently played" — mock data for v1.
 *
 * Production wiring (per design-reference/Now Preview.html spec comment):
 *   - Server Component fetching from app/api/spotify/recent/route.ts
 *   - Edge route, 5-min revalidation cache
 *   - Spotify Web API with long-lived refresh token (env vars, no user OAuth)
 *   - Returns { tracks: [{ id, title, artist, album, when, artworkUrl }] }
 *   - Fallback on API error: render a static "Album of the month" card
 *
 * For v1, this is a presentational server component reading 5 hardcoded tracks
 * from data/now.json. Swap the data source for the real /api/spotify/recent
 * fetch when credentials are wired (see HANDOFF "Things you'll need from Jason").
 */
export function SpotifyRecent() {
  return (
    <div className="spotify-card">
      <div className="spotify-head">
        <div className="title">Recently played</div>
        <div className="live">synced 4m ago</div>
      </div>
      <ol className="track-list">
        {nowData.tracks.map((track) => (
          <li key={`${track.title}-${track.artist}`} className="track">
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
        <span>via Spotify Web API</span>
        <a href="https://open.spotify.com/user/jvermaelen">open profile ↗</a>
      </div>
    </div>
  );
}
