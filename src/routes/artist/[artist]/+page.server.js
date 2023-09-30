import { updateArtistVotes } from '$lib/index.js';

export const actions = {
    updateartistvotes: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");
        return updateArtistVotes(id);
    }
};