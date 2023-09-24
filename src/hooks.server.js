

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

// use a batch to perform multiple operations
// const batch = writeBatch(db);

// // add each object in the array to the batch
// artistsArray.forEach((artist) => {
//     const docRef = doc(collection(db, "artists"));
//     batch.set(docRef, artist);
// })

// // commit the batch
// try {
//     await batch.commit();
//     console.log('Batch of documents added successfully');
// } catch(e) {
//     console.log(`Error adding batch of documents: ${e}`);
// }


