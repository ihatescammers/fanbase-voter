import { getArtists } from '$lib/index.js';

const artists = getArtists();

export function load({ url }) {
    return {
        url: url.pathname,
        artists: artists
    }
}