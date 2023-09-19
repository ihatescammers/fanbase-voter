export const _actions = {
	// createArtist: async ({ request }) => {
    //     const data = await request.formData();

    // }
};

export function load({ setHeaders }) {
    setHeaders({
        'Cross-Origin-Opener-Policy': 'same-origin'
    })
}
