import { getDoc, addDoc, collection, doc, deleteDoc, query, getDocs, orderBy, updateDoc } from 'firebase/firestore';
import { app, db } from '$lib';
import { additionalUserInfo } from '../../../lib/auth.js';

export async function load() {
    try {
        const q = query(collection(db, 'artists'), orderBy("votes", "desc"));
        const artists = await getDocs(q);
        const cRef = doc(db, "categories", "categories");
        const c = await getDoc(cRef);
        const categories = c.data();

        return {
            leaderboard: artists.docs.map(artist => ({
                            id: artist.id,
                            name: artist.data().name,
                            votes: artist.data().votes,
                            backgroundImage: artist.data().backgroundImage,
                            enrolledIn: artist.data().enrolledIn,
                            votesArr: artist.data().votesArr,
                            fandomName: artist.data().fandomName
                        })),
            categories: categories.categories
        }
    } catch(e) {
        console.log(`Error fetching artists: ${e}`);
        return;
    }
}

export const actions = {
    purchaseVotes: async ({ request }) => {
        try {
            const data = await request.formData();
            const amount = data.get("votesAmount");
            const uid = data.get("uid");
            const docRef = doc(db, "users", uid);
            console.log('uid: ',uid);
            await updateDoc(docRef, {
                paidVotesRemaining: parseInt(amount)
            });
            additionalUserInfo.update(v => {
                console.log(v);
                return {...v, paidVotesRemaining: amount}
            });
            console.log('successfully updated')
            return {
                status: true,
                message: 'Purchase successful!'
            }
        } catch (e) {
            console.log('error: ', e)
            return {
                status: false,
                message: 'Purchase failed. Please try again later.'
            }
        }
    }
}