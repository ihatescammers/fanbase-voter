import { writeBatch, doc, collection } from "firebase/firestore";
import { app, db  } from "./lib/index.js";

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

const artists = [
    {
        backgroundImage: 'https://i.ytimg.com/vi/YQHsXMglC9A/maxresdefault.jpg',
        name: 'Adele',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://cloudfront-us-east-1.images.arcpublishing.com/gray/V7XBQ2WO3JK2FKYCWIAO7UPWPQ.jpg',
        name: 'Joey + Rory',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://media.gq.com/photos/56bb8a91b89407780bd7d454/16:9/w_2560%2Cc_limit/bieber-16-9-longform.jpg',
        name: 'Justin Bieber',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://wallpapercave.com/wp/wp7904608.jpg',
        name: 'Chris Janson',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://wallpapercave.com/wp/HDvDxtU.jpg',
        name: 'One Direction',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://wallpapercave.com/wp/wp2742389.jpg',
        name: 'Drake',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://images4.alphacoders.com/193/193246.jpg',
        name: 'Carrie Underwood',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://i0.wp.com/mpmania.com/wp-content/uploads/2020/12/Ed-Sheeran-Afterglow.jpg?fit=19201080&ssl=1',
        name: 'Ed Sheeran',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://wallpapercave.com/wp/wp5246106.jpg',
        name: 'Taylor Swift',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://i.pinimg.com/originals/18/94/d5/1894d5a5eac93eef71d7b86d67669a90.jpg',
        name: 'SayWeCanFly',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://w.forfun.com/fetch/52/526bb24b74d5e205482c1100a48309fd.jpeg',
        name: 'Selena Gomez',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://wallpapercave.com/wp/wp6370702.jpg',
        name: 'Chris Brown',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://getwallpapers.com/wallpaper/full/b/9/c/658127.jpg',
        name: 'Nicki Minaj',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://wallpapercave.com/wp/wp2002644.jpg',
        name: 'Fifth Harmony',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://wallpapercave.com/wp/wp2564364.jpg',
        name: 'Eminem',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://c4.wallpaperflare.com/wallpaper/668/766/366/beyonce-hd-widescreen-wallpaper-preview.jpg',
        name: 'Beyonce\'',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://assets.teenvogue.com/photos/609d338f767d08a7e76d4efa/16:9/w_2560%2Cc_limit/billie.jpeg',
        name: 'Billie Eilish',
        votes: Math.floor(Math.random() * 2000)
    },
    {
        backgroundImage: 'https://i.ytimg.com/vi/g5yZfM4YbYY/maxresdefault.jpg',
        name: 'Dasucakes',
        votes: Math.floor(Math.random() * 2000)
    },
]

// use a batch to perform multiple operations
// const batch = writeBatch(db);

// // add each object in the array to the batch
// artists.forEach((artist) => {
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


