const artists = [
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/n3/images/1.webp',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/n3/images/2.webp',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/n3/images/3.webp',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/n3/images/4.webp',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/n3/images/5.webp',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/n3/images/6.webp',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/n3/images/7.webp',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/cln/images/1.jpg',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/cln/images/2.jpg',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/cln/images/3.jpg',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/cln/images/4.jpg',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/cln/images/5.jpg',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
    {
        id: 1111,
        backgroundImage: 'https://misc-six.vercel.app/cln/images/6.jpg',
        name: 'Ryan Higa',
        votes: Math.floor(Math.random() * 800),
    },
]

const names = ['Ryan','Harold','Taylor','Billie','Arctic','Jay','Z','R','K','S','Doves','Jude','Blue','Andreas','Rock','Saige','Bowen','Kylan']

export function load({ url }) {
    return {
        url: url.pathname,
        artists: artists.map((artist) => ({
            backgroundImage: artist.backgroundImage,
            name: names[Math.floor(Math.random() * names.length)] + ' ' + names[Math.floor(Math.random() * names.length)],
            votes: artist.votes
        }))
    }
}