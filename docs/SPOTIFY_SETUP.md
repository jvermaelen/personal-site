# Spotify "Recently played" - one-time setup

The `/now` page pulls the last 5 tracks Jason played from Spotify and renders
them via `components/now/SpotifyRecent.tsx`. The data flow:

```
Spotify Web API  ──►  lib/spotify.ts  ──►  SpotifyRecent (Server Component)
                            │
                            └──►  /api/spotify/recently-played (Edge route)
```

Until the three env vars below are set, the component renders a fallback list
from `data/now.json` with a "from the playlist" label. Once the env vars exist,
the component shows live data with a "synced Xm ago" label.

## What you need to do once

### 1. Create a Spotify developer app

1. Go to <https://developer.spotify.com/dashboard>
2. Log in with Jason's personal Spotify account (the one whose recent plays you want to surface)
3. Click "Create app"
   - **App name:** `jasonvermaelen.com`
   - **App description:** `Personal site - recently played widget`
   - **Redirect URI:** `http://127.0.0.1:8888/callback` (only used once, for the consent flow below)
   - **API used:** Web API
4. Save. From the app's settings page, copy:
   - **Client ID** → this is `SPOTIFY_CLIENT_ID`
   - **Client secret** (click "View client secret") → this is `SPOTIFY_CLIENT_SECRET`

### 2. Grant the app permission once and capture a refresh token

Spotify's refresh tokens don't expire (unless you revoke them), so this is a
one-time dance.

**Step 1.** Build the consent URL. Replace `YOUR_CLIENT_ID`:

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback&scope=user-read-recently-played
```

Paste into a browser where you're logged into the right Spotify account.
Approve. The browser will redirect to a `127.0.0.1:8888/callback?code=...` URL
that fails to load (no server running) - that's fine. Copy the `code` query
param value from the URL bar.

**Step 2.** Trade the code for a refresh token. From PowerShell:

```powershell
$clientId = "YOUR_CLIENT_ID"
$clientSecret = "YOUR_CLIENT_SECRET"
$code = "THE_CODE_FROM_STEP_1"
$basic = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("${clientId}:${clientSecret}"))

Invoke-RestMethod -Method Post -Uri "https://accounts.spotify.com/api/token" `
  -Headers @{ Authorization = "Basic $basic" } `
  -Body @{
    grant_type   = "authorization_code"
    code         = $code
    redirect_uri = "http://127.0.0.1:8888/callback"
  }
```

The response includes `refresh_token`. That's `SPOTIFY_REFRESH_TOKEN`. Save it
somewhere safe (1Password, etc.) - if you lose it you can re-do the dance
above to get a new one.

### 3. Add the three env vars to Vercel

In the Vercel project dashboard, **Settings → Environment Variables**, add for
**Production**, **Preview**, and **Development**:

| Name                      | Value                              |
| ------------------------- | ---------------------------------- |
| `SPOTIFY_CLIENT_ID`       | from step 1                        |
| `SPOTIFY_CLIENT_SECRET`   | from step 1                        |
| `SPOTIFY_REFRESH_TOKEN`   | from step 2                        |

Redeploy (or trigger a fresh build on main). The `/now` page should now show
live data on the next 5-minute cache window.

### 4. (Optional) Local dev

If you want live data in local dev, drop the same three vars into a local
`.env.local` file:

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

`.env.local` is git-ignored by default in Next.js projects.

## How to tell it's working

- `/now` page, "Recently played" card: label reads "synced Xm ago" (live)
  vs. "from the playlist" (fallback)
- Hit `/api/spotify/recently-played` directly: response JSON has
  `"source": "live"` (live) vs. `"source": "fallback"` with a `reason`

## If it stops working later

- **`reason: "missing-credentials"`** → an env var got cleared in Vercel
- **`reason: "token-refresh-failed"`** → the refresh token was revoked or the
  client secret rotated; redo step 2
- **`reason: "spotify-401"`** → same as above
- **`reason: "spotify-429"`** → rate-limited (very unlikely with 5-min cache);
  fallback kicks in automatically
- **`reason: "fetch-failed"`** → Spotify API is down or network hiccup;
  fallback kicks in automatically

The fallback is intentional - the page never breaks on a Spotify outage, it
just visibly switches to the curated list.
