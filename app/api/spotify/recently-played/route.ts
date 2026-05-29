import { NextResponse } from 'next/server';
import { getRecentlyPlayed } from '@/lib/spotify';

/**
 * GET /api/spotify/recently-played
 *
 * Edge-runtime JSON endpoint returning the latest 5 tracks from Jason's
 * Spotify account. Primarily consumed by the /now page server component,
 * but exposed as a route for future client-side hydration or external use.
 *
 * Response shape:
 *   { source: 'live' | 'fallback', fetchedAt, tracks, reason? }
 *
 * Caching: s-maxage=300 (5 min) + stale-while-revalidate=600.
 * The underlying helper also revalidates the Spotify fetch every 5 min,
 * so worst case we hit Spotify ~12 times/hour regardless of traffic.
 */

export const runtime = 'edge';
export const revalidate = 300;

export async function GET() {
  const data = await getRecentlyPlayed();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
    },
  });
}
