import { getDoc, addDoc, collection, doc, deleteDoc, query, getDocs, orderBy, updateDoc } from 'firebase/firestore';
import { app, db } from '$lib';
import { additionalUserInfo } from '$lib/auth.js';

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