import { writable } from 'svelte/store';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { app, db } from './index.js';

export const user = writable(null);
export const voted = writable(false);

const auth = getAuth(app);
onAuthStateChanged(auth, (newUser) => {
    if (newUser) {
        user.set({
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            emailVerified: newUser.emailVerified,
            photoURL: newUser.photoURL,
        });
    }
    else {
        user.set(null);
    }
});

let userValue;
user.subscribe(async (changedUser) => {
    userValue = changedUser;
    if (changedUser) { // user exists and is logged in
        const docRef = doc(db, "users", changedUser.uid);
        const userSnap = await getDoc(docRef);

        if (userSnap.exists()) { // document exists, access its data
            console.log('This user exists')
            if (userSnap.data().votedFor == '') {
                // user has not voted
                voted.set(false);
                console.log(`${changedUser.displayName} has not yet voted.`);
                // Use setDoc with merge option to create a document if it does not exist
                const updatedUser = await setDoc(docRef, {
                    votedFor: ''
                }, { merge: true })
            }
            else {  
                // user has already voted
                voted.set(true);
                console.log(`${changedUser.displayName} has voted for ${userSnap.data().votedFor}`)
            }
        } 
        else { 
            // document doesnt exist, create a new one with default values
            voted.set(false);
            console.log(`${changedUser.displayName} has not yet voted.`);
            const updatedUser = await setDoc(docRef, {
                votedFor: ''
            })
        }
    }
});


export const setVoted = async (artistID) => {
    try {
        const userRef = doc(db, "users", userValue.uid);
        await setDoc(userRef, {
            votedFor: artistID
        }, { merge: true });
        user.update(u => u); // reinstantiate user value to call the subscribe method on user again
    } catch(e) {
        console.log(e)
    }
}