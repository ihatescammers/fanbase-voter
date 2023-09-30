import { getArtists } from '$lib/index.js';
import { getOrderedArtists } from '../lib/index.js';

const artists = getArtists();
const leaderboard = getOrderedArtists();

export function load({ url, setHeaders }) {
    setHeaders({
        // 'Cache-Control': 'no-cache'
    });

    return {
        url: url.pathname,
        artists: artists,
        leaderboard: leaderboard
    }
}