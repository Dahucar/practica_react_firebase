import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    /* 
        2° parametro en callback: permite obtene el state de mi store
        en funcionamiento es igual que usar el useSelected. pero aqui será 
        proporcionado por Redux Thunk.
    */
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        dispatch( activeNotes( doc.id, newNote ) );
        dispatch( addNewNotePanel( doc.id, newNote ) );
    }
}

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes =  await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSaveNote= ( note ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        if ( !note?.url ) {
            delete note.url;
        }
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );
        dispatch( refresNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');
    }
}

export const startDeleteNote = ( id ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete().then();
        dispatch( deleteNote( id ) );
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})

export const refresNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        // De esta forma estoy enviado todos los datos de la nota de manera individual.
        note: {
            id,
            ...note
        }
    }
})

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const activeNotes = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})

export const addNewNotePanel = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})