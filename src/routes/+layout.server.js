import { getOrderedArtists, db } from '../lib/index.js';
import { getDoc, doc } from 'firebase/firestore';

// const artists = getArtists();
const leaderboard = getOrderedArtists();
// fetch "backgroundimage" from the "about" collection
const getBackgroundImage = async () => {
    try {
        const docRef = doc(db, "about", "about");
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        return data.backgroundimage;
    } catch (e) {
        console.log(e)
    }
};

export function load({ url, setHeaders }) {
    setHeaders({
        // 'Cache-Control': 'no-cache'
    });

    return {
        url: url.pathname,
        artists: leaderboard,
        leaderboard: leaderboard,
        backgroundImage: getBackgroundImage()
    }
}