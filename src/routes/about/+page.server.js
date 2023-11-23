import { app, db } from "$lib";
import { getDocs, getDoc, setDoc, doc } from "firebase/firestore";


// get the first doc in the collection named "about"
export const load = async () => {
    const docRef = doc(db, "about", "about");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    console.log(data);
    return {
        about: data
    }
}
