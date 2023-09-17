// place files you want to import through the `$lib` alias in this folder.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvfmwSkKpiBEC-H0ZlkIv8m43Bg4zOGjk",
  authDomain: "fanbase-voter.firebaseapp.com",
  projectId: "fanbase-voter",
  storageBucket: "fanbase-voter.appspot.com",
  messagingSenderId: "442591407052",
  appId: "1:442591407052:web:2a061d2f911bb900de4b69",
  measurementId: "G-2NZX276N15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();

// export const artists = await getDocs(collection(db, 'artists'));
export const getArtists = async () => {
    const artists = await getDocs(collection(db, 'artists'));
    return artists.docs.map(artist => ({
        id: artist.data().id,
        first: artist.data().first,
        fullName: artist.data().first + ' ' + artist.data().last,
        votes: artist.data().votes,
        backgroundImage: artist.data().backgroundImage,
        profilePicture: artist.data().profilePicture
    }))
}


// export const getArtists = async () => {
//     artists.forEach((artist) => {console.log(artist.data())})
//     // const result = artists.map((artist) => {({
//     //         id: artist.data().id,
//     //         first: artist.data().first,
//     //         fullName: artist.data().first + ' ' + artist.data().last,
//     //         votes: artist.data().votes,
//     //         backgroundImage: artist.data().backgroundImage,
//     //         profilePicture: artist.data().profilePicture
//     //     })})
//     // const result = artists;
//     console.log(artists)
//     return artists;
// }