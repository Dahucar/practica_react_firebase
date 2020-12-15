import { db } from "../firebase/firebase-config"

export const loadNotes = async ( uid ) => {
    const notes = [];
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });

    return notes;
}