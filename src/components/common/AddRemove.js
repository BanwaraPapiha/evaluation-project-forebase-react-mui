import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

async function Remove2Array(ref, user2Add) {
    await updateDoc(ref, {
        users: arrayRemove(String(user2Add))
    });
}

async function Add2Array(ref, user2Add) {
    await updateDoc(ref, {
        users: arrayUnion(String(user2Add))
    });
}

export {Remove2Array, Add2Array}
