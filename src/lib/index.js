// place files you want to import through the `$lib` alias in this folder.
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, query, updateDoc } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, orderBy } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvfmwSkKpiBEC-H0ZlkIv8m43Bg4zOGjk",
//   authDomain: "fanbase-voter.vercel.app", // add this before deployment, or auth wont work on firefox
  authDomain: "fanbase-voter.firebaseapp.com", // remove this before deployment, or auth wont work on firefox
  projectId: "fanbase-voter",
  storageBucket: "fanbase-voter.appspot.com",
  messagingSenderId: "442591407052",
  appId: "1:442591407052:web:2a061d2f911bb900de4b69",
  measurementId: "G-2NZX276N15",
//   clientId: "442591407052-q2oskicagqm3sga5cptnvb110eneh5hk.apps.googleusercontent.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();


export const getArtists = async () => {
    const artists = await getDocs(collection(db, 'artists'));
    console.log('fetched artists');
    return artists.docs.map(artist => ({
        id: artist.id,
        name: artist.data().name,
        votes: artist.data().votes,
        backgroundImage: artist.data().backgroundImage,
        profilePicture: artist.data().profilePicture
    }))
}

export const getOrderedArtists = async () => {
    try {
        const q = query(collection(db, 'artists'), orderBy("votes", "desc"));
        const artists = await getDocs(q);
        return artists.docs.map(artist => ({
            id: artist.id,
            name: artist.data().name,
            votes: artist.data().votes,
            backgroundImage: artist.data().backgroundImage,
        }))
    } catch(e) {
        console.log(`Error fetching artists: ${e}`);
        return;
    }
}

export const addArtist = async (artist) => {
    try {
        const docRef = await addDoc(collection(db, "artists"), artist);
        console.log(`Successfully added artist with ID: ${docRef.id}`)
    } catch (e) {
        console.log(`Error adding to collection artists: ${e}`)
    }
}

export const updateArtistVotes = async (id) => {
    const docRef = doc(db, "artists", id);
    try {
        const artistRef = await getDoc(docRef);
        const artistData = artistRef.data();
        const newVotes = artistData.votes + 1
        const artistUpdate = await updateDoc(docRef, {
            votes: newVotes
        });
        console.log(`Update artist ${artistRef.id}'s votes with new value: ${newVotes}`);
        return {
            status: true,
            message: 'Your vote has been cast!',
            votes: newVotes
        }
    } catch(e) {
        console.log(`Error: ${e}`);
        return {
            status: false,
            message: 'An error occurred, please try again later.'
        }
    }
}



import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
 
// const provider = new GoogleAuthProvider();

// signInWithPopup(auth, provider)
// .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult();
//     const token = credential.accessToken;

//     // the signed in user info
//     // IdP data available using getAdditionalUserInfo(result)
//     const user = result.user;
//     console.log(user)
// })
// .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     const email = error.customData.email;
//     const credential = GoogleAuthProvider.credentialFromError(error);

//     console.log(`Error ${errorCode}: ${errorMessage}`);
// })

// createUserWithEmailAndPassword(auth, 'thelonerdude92@gmail.com', 'password1234')
// .then((userCredential) => {
//     const user = userCredential.user;
//     // console.log(userCredential)
// })
// .catch((error) => {
//     console.log(`Error ${error.code}: ${error.message}`);
// });


// const r = getAuth();