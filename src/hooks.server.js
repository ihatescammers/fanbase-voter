import { writeBatch, getDocs, doc, collection, addDoc, updateDoc, deleteField, arrayUnion } from "firebase/firestore";
import { app, db, updateArtistVotes  } from "./lib/index.js";

// try {
//     const docRef = await addDoc(collection(db, "users"), {
//         first: 'Ada',
//         last: 'Lovelace',
//         born: 1815
//     });
//     console.log(`Document written with ID ${docRef.id}`)
// } catch(e) {
//     console.log(`Error finding document: ${e}`)
// }



// const artistsArray = [
//     {
//       id: 10000,
//       backgroundImage: 'https://misc-six.vercel.app/n3/images/1.webp',
//       profilePicture: 'https://misc-six.vercel.app/n3/images/1.webp',
//       first: 'Micheal',
//       last: 'Doves',
//       votes: 187
//     },
//     {
//       id: 10001,
//       backgroundImage: 'https://misc-six.vercel.app/n3/images/2.webp',
//       profilePicture: 'https://misc-six.vercel.app/n3/images/2.webp',
//       first: 'Harold',
//       last: 'Mellanie',
//       votes: 579
//     },
//     {
//       id: 10002,
//       backgroundImage: 'https://misc-six.vercel.app/n3/images/3.webp',
//       profilePicture: 'https://misc-six.vercel.app/n3/images/3.webp',
//       first: 'Robert',
//       last: 'R',
//       votes: 535
//     },
//     {
//       id: 10003,
//       backgroundImage: 'https://misc-six.vercel.app/n3/images/4.webp',
//       profilePicture: 'https://misc-six.vercel.app/n3/images/4.webp',
//       first: 'Mellanie',
//       last: 'Bowen',
//       votes: 44
//     },
//     {
//       id: 10004,
//       backgroundImage: 'https://misc-six.vercel.app/n3/images/5.webp',
//       profilePicture: 'https://misc-six.vercel.app/n3/images/5.webp',
//       first: 'K',
//       last: 'Ryan',
//       votes: 7
//     },
//     {
//       id: 10005,
//       backgroundImage: 'https://misc-six.vercel.app/n3/images/6.webp',
//       profilePicture: 'https://misc-six.vercel.app/n3/images/6.webp',
//       first: 'Harold',
//       last: 'Harold',
//       votes: 523
//     },
//     {
//       id: 10006,
//       backgroundImage: 'https://misc-six.vercel.app/n3/images/7.webp',
//       profilePicture: 'https://misc-six.vercel.app/n3/images/7.webp',
//       first: 'James',
//       last: 'K',
//       votes: 506
//     },
//     {
//       id: 10007,
//       backgroundImage: 'https://misc-six.vercel.app/cln/images/1.jpg',
//       profilePicture: 'https://misc-six.vercel.app/cln/images/1.jpg',
//       first: 'Jay',
//       last: 'Harold',
//       votes: 582
//     },
//     {
//       id: 10008,
//       backgroundImage: 'https://misc-six.vercel.app/cln/images/2.jpg',
//       profilePicture: 'https://misc-six.vercel.app/cln/images/2.jpg',
//       first: 'Doves',
//       last: 'Jude',
//       votes: 177
//     },
//     {
//       id: 10009,
//       backgroundImage: 'https://misc-six.vercel.app/cln/images/3.jpg',
//       profilePicture: 'https://misc-six.vercel.app/cln/images/3.jpg',
//       first: 'J',
//       last: 'Kylan',
//       votes: 271
//     },
//     {
//       id: 10010,
//       backgroundImage: 'https://misc-six.vercel.app/cln/images/4.jpg',
//       profilePicture: 'https://misc-six.vercel.app/cln/images/4.jpg',
//       first: 'J',
//       last: 'Z',
//       votes: 308
//     },
//     {
//       id: 10011,
//       backgroundImage: 'https://misc-six.vercel.app/cln/images/5.jpg',
//       profilePicture: 'https://misc-six.vercel.app/cln/images/5.jpg',
//       first: 'Nolan',
//       last: 'Micheal',
//       votes: 296
//     },
//     {
//       id: 10012,
//       backgroundImage: 'https://misc-six.vercel.app/cln/images/6.jpg',
//       profilePicture: 'https://misc-six.vercel.app/cln/images/6.jpg',
//       first: 'Arctic',
//       last: 'Taylor',
//       votes: 114
//     }
//   ]

const updateAllUsers = async () => {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const batch = writeBatch(db);
    usersSnapshot.forEach((userDoc) => {
        const userRef = doc(db, "users", userDoc.id);
        // delete the property "votesRemaining" and "votedFor"
        batch.update(userRef, {
            votedIn: [],
            purchases: deleteField(),
            paidVotesRemaining: 0,
        })
    });
    try {
        await batch.commit();
        console.log("All users updated with 'votedIn'");
    } catch (e) {
        console.log(`Error updating users: ${e}`);
    }
}

// updateAllUsers();

const updateAllArtists = async () => {
    const artistsRef = collection(db, "artists");
    const artistsSnapshot = await getDocs(artistsRef);
    const batch = writeBatch(db);

    artistsSnapshot.forEach((artistDoc) => {
        const artistRef = doc(db, "artists", artistDoc.id);
        const artistName = artistDoc.data().name;
        const votesArr = artistDoc.data().enrolledIn.map(category => Math.floor(artistDoc.data().votes * Math.random() * 2))
        batch.update(artistRef, {
            votesArr: votesArr
        })
    });

    try {
        await batch.commit();
        console.log("All artists updated with 'enrolledIn' categories");
    } catch (e) {
        console.log(`Error updating artists: ${e}`);
    }
}

// Call the function to update all artists
// updateAllArtists();


// updateAllUsers();

// create a collection called "categories" and fill it with an array of strings

// const createCategories = async () => {
//   // Define the array of strings
//   const categories = [
//     "Artist of the Year",
//     "New Artist of the Year",
//     "Collaboration of the Year",
//     "Favorite Touring Artist",
//     "Favorite Music Video",
//     "Favorite Male Pop Artist",
//     "Favorite Female Pop Artist",
//     "Favorite Pop Duo or Group",
//     "Favorite Pop Album",
//     "Favorite Pop Song",
//     "Favorite Male Country Artist",
//     "Favorite Female Country Artist",
//     "Favorite Country Duo or Group",
//     "Favorite Country Album",
//     "Favorite Country Song",
//     "Favorite Male Hip-Hop Artist",
//     "Favorite Female Hip-Hop Artist",
//     "Favorite Hip-Hop Album",
//     "Favorite Hip-Hop Song",
//     "Favorite Male R&B Artist",
//     "Favorite Female R&B Artist",
//     "Favorite R&B Album",
//     "Favorite R&B Song",
//     "Favorite Male Latin Artist",
//     "Favorite Female Latin Artist",
//     "Favorite Latin Duo or Group",
//     "Favorite Latin Album",
//     "Favorite Latin Song",
//     "Favorite Rock Artist",
//     "Favorite Rock Song",
//     "Favorite Rock Album",
//     "Favorite Inspirational Artist",
//     "Favorite Gospel Artist",
//     "Favorite Dance/Electronic Artist",
//     "Favorite Soundtrack",
//     "Favorite Afrobeats Artist",
//     "Favorite K-Pop Artist"
//   ];
  

//   try {
//         // select the document with the key: categories and update it to the new value
//         const docRef = doc(db, "categories", "categories");
//         await updateDoc(docRef, {
//             categories: categories
//         });
//         console.log("Document updated successfully!");
//     } 
//     catch (e) {
//         console.log(`Error adding categories to collection: ${e}`);
//     }
// };

// // Call the function to create categories
// createCategories();



