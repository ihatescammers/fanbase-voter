import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '$lib';

export async function load() {
    try {
        const q = query(collection(db, 'artists'), orderBy("votes", "desc"));
        const artists = await getDocs(q);

        return {
            leaderboard: artists.docs.map(artist => ({
                            id: artist.id,
                            name: artist.data().name,
                            votes: artist.data().votes,
                            backgroundImage: artist.data().backgroundImage,
                        })),
        }
    } catch(e) {
        console.log(`Error fetching artists: ${e}`);
        return;
    }
}