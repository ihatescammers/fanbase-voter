import { writable } from 'svelte/store';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDoc, updateDoc, doc, collection, setDoc } from 'firebase/firestore';
import { app, db } from './index.js';

export const user = writable(null);
export const voted = writable(false);

const auth = getAuth(app);
onAuthStateChanged(auth, (newUser) => {
    user.set(newUser)
    // if (newUser) {
    //     user.set({
    //         uid: newUser.uid,
    //         email: newUser.email,
    //         displayName: newUser.displayName,
    //         emailVerified: newUser.emailVerified,
    //         photoURL: newUser.photoURL,
    //     });
    // }
    // else {
    //     user.set(null);
    // }
    console.log(newUser)
});

user.subscribe(async (changedUser) => {
    // if (changedUser) { // user exists and is logged in
    //     const docRef = doc(db, "users", changedUser.uid);
    //     const userSnap = await getDoc(docRef);
    //     if (!userSnap.data().votedFor || !userSnap.data().votedFor == '') {
    //         userVoted.set(false);
    //         console.log(`${changedUser.displayName} has not yet voted.`)
    //         const updatedUser = await setDoc(docRef, {
    //             votedFor: 'artistIdHere'
    //         })
    //     } 
    //     else {
    //         // user already voted
    //         userVoted.set(true);
    //         console.log(`${changedUser.displayName} has already voted.`)
    //     }
    //     console.log(changedUser);
    // }
});
