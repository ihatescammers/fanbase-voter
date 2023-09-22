import { getArtists } from '$lib/index.js';

const artists = getArtists();

export function load({ url, setHeaders }) {
    setHeaders({
        'Cache-Control': 'no-store'
    });

    return {
        url: url.pathname,
        artists: artists
    }
}