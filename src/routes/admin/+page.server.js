import { getDoc, addDoc, collection, doc, deleteDoc, query, getDocs, orderBy, updateDoc } from 'firebase/firestore';
import { app, db } from '$lib';
import { fail } from '@sveltejs/kit';

export async function load() {
    try {
        const q = query(collection(db, 'artists'), orderBy("votes", "desc"));
        const artists = await getDocs(q);
        const cRef = doc(db, "categories", "categories");
        const c = await getDoc(cRef);
        const categories = c.data();

        return {
            leaderboard: artists.docs.map(artist => ({
                            id: artist.id,
                            name: artist.data().name,
                            votes: artist.data().votes,
                            backgroundImage: artist.data().backgroundImage,
                            enrolledIn: artist.data().enrolledIn,
                            votesArr: artist.data().votesArr,
                            fandomName: artist.data().fandomName
                        })),
            categories: categories.categories
        }
    } catch(e) {
        console.log(`Error fetching artists: ${e}`);
        return;
    }
}

const isValidUrl = (url) => {
    try {
        new URL(url);
        const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.heif', '.webp'];

        if (!extensions.some(ext => url.includes(ext))) {
            return false;
        }

        return true;
    } 
    catch (error) {
        return false;
    }
};

export const actions = {
    addArtist: async ({ request }) => {
        try {
            const data = await request.formData();
            const name = data.get("name")
            const fandomName = data.get("fandomName")
            const votes = data.get("votes")
            const backgroundImage = data.get("backgroundImage")
            const categories = data.getAll("categories");
            const votesArr = Array.from({length: categories.length}, () => 0);
            const artist = {
                name,
                fandomName,
                votes: votes === null || votes === "" ? 0 : parseInt(votes),
                backgroundImage,
                enrolledIn: categories,
                votesArr: votesArr
            }

            // ensure that backgroundImage is a valid url
            if (!isValidUrl(backgroundImage)) {
                return fail(422, {
                    type: 'addArtist',
                    success: false,
                    error: 'Invalid image URL. Valid URLs start with http:// or https:// and end with an image format like .jpg, .png, .webp, etc'
                });
            }

            const docRef = await addDoc(collection(db, "artists"), artist);
            console.log(`Successfully added artist with ID: ${docRef.id}`)
            return {
                type: 'addArtist',
                success: true,
                message: `${name}'s fanbase added successfully!`
            }
        } catch(e) {
            console.log(`Error adding to collection artists: ${e}`);
            return fail(422, {
                type: 'addArtist',
				success: false,
				error: 'Could not add new fanbase, please revalidate data and try again'
			});
        }
    },
    deleteArtist: async ({request}) => {
        const data = await request.formData();
        try {
            const id = data.get("id");
            const docRef = doc(db, "artists", id);
            await deleteDoc(docRef);
            console.log(`deleted artist with id: ${id}`);
            return {
                type: 'deleteArtist',
                id: data.get("id"),
                success: true,
                message: 'Artist deleted successfully! Changes may either be reflected immediately, or take up to 24 hours to reflect.'
            }
        } catch(e) {
            console.log(`Error deleting artist: ${e}`);
            return fail(422, {
                type: 'deleteArtist',
				success: false,
				deletionError: 'Error deleting artist, please check your internet connection, refresh the page and try again'
			});
        }
    },
    setBackgroundImage: async ({request}) => {
        try {
            const data = await request.formData();
            const link = data.get("link");
            const docRef = doc(db, "about", "about");
            await updateDoc(docRef, {
                backgroundimage: link
            }, {merge: true});
        } catch (e) {
            console.log(e);
        }
    }
};

const logArtist = async (id) => {
    // get artist with this id:'Rlv9v297mEbqEUEA1H8R'
    const docRef = doc(db, "artists", id);
    const res = await getDoc(docRef);
    console.log(res.data())
    // // delete this doc
    // await deleteDoc(docRef);
    // console.log('deleted')
}
// logArtist("jpT3ZRMZ8IaRIG9rsyEQ");