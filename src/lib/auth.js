import { writable } from 'svelte/store';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app } from './index.js';

export const user = writable(null);

const auth = getAuth(app);
onAuthStateChanged(auth, (newUser) => {
    user.set(newUser)
});

// user.subscribe((value) => {console.log(value)});
