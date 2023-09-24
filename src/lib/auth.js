import { writable } from 'svelte/store';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { app, db } from './index.js';

export const user = writable(null);

const auth = getAuth(app);
onAuthStateChanged(auth, async (newUser) => {
    user.set(newUser);
    if (newUser) {
        // fetch user from collection "users" with id newUser.uid
        const docRef = doc(db, "users", newUser.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap)
        // if (docSnap.exists()) {
        //     // console.log("Document data:", docSnap.data());
        //     user.set(docSnap.data());
        // }
    }
});

// user.subscribe((value) => {console.log(value)});

