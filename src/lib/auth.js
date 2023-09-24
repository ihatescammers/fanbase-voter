import { writable } from 'svelte/store';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDoc, updateDoc } from 'firebase/firestore';
import { app } from './index.js';
// import 

export const user = writable(null);

const auth = getAuth(app);
onAuthStateChanged(auth, async (newUser) => {
    user.set(newUser);
    if (newUser) {
        const docRef = doc(db, collection("users"), newUser.uid);
        const userRef = await getDoc(docRef);
        await updateDoc(userRef, {
            votedFor: ''
        })
    }
});

// user.subscribe((value) => {console.log(value)});
