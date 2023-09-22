import { updateArtistVotes } from '$lib/index.js';


export function load({ setHeaders }) {
    setHeaders({
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cache-Control': 'no-cache'
    })
}

export const actions = {
    updateartistvotes: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");
        return updateArtistVotes(id);
    }
};