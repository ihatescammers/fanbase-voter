import { writable } from 'svelte/store';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDoc, setDoc, doc, getDocs } from 'firebase/firestore';
import { app, db } from './index.js';

export const user = writable(null); 
export const voted = writable([]);
export const additionalUserInfo = writable(null);

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
            additionalUserInfo.set(userSnap.data());
            if (!userSnap.data().votedIn || userSnap.data().votedIn.length === 0) {
                // user has not voted
                voted.set([]);
                console.log(`${changedUser.displayName} has not yet voted.`);
                // Use setDoc with merge option to create a document if it does not exist
                const updatedUser = await updateDoc(docRef, {
                    votedIn: [],
                    paidVotesRemaining: 0,
                    purchases: 0
                })
            }
            else {  
                // user has already voted
                voted.set([...userSnap.data().votedIn]);
                console.log(`${changedUser.displayName} has voted for ${userSnap.data().votedIn}`)
            }
        } 
        else { 
            // document doesnt exist, create a new one with default values
            voted.set([]);
            console.log(`${changedUser.displayName} has not yet voted.`);
            const updatedUser = await setDoc(docRef, {
                votedIn: [],
                paidVotesRemaining: 0,
                purchases: 0
            })
        }
    }
});

let votedInValue;
voted.subscribe((changedVoted) => {
    votedInValue = changedVoted;
    console.log(changedVoted)
})

export const setVoted = async (category) => {
    console.log("current VotedIn value:", votedInValue)
    try {
        const userRef = doc(db, "users", userValue.uid);
        votedInValue.push(category);
        votedInValue = votedInValue;
        await setDoc(userRef, {
            votedIn: votedInValue
        }, { merge: true });
        setTimeout(() => {
            user.update(u => u); // reinstantiate user value to call the subscribe method on user again
            voted.set(votedInValue);
        }, 1500)
        console.log(`User ${userValue.displayName} voted for ${category}`)
    } catch(e) {
        console.log(e)
    }
}


// select all users and update them to have a "remainingVotes" property, and set that property to 1
// export const updateAllUsers = async () => {
//     console.log('bingus')
//     const usersRef = collection(db, "users");
//     const usersSnapshot = await getDocs(usersRef);
//     const batch = writeBatch(db);

//     usersSnapshot.forEach((userDoc) => {
//         const userRef = doc(db, "users", userDoc.id);
//         batch.update(userRef, {
//             remainingPaidVotes: 0
//         });
//     });

//     try {
//         await batch.commit();
//         console.log("All users updated with 'remainingVotes' property set to 1");
//     } catch (e) {
//         console.log(`Error updating users: ${e}`);
//     }
// };
