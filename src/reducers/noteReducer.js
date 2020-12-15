import { types } from "../types/types";

/*
    {
        notes: [],
        active: null,
        activeNote: {
            id: 'asd',
            title: '',
            body: '',
            imageUrl: '',
            date: ''
        }
    }
*/
const initialState = {
    notes:[],
    active: null
}
export const notesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.notesActive:
            // Regresando un nuevo estado
            return {
                ...state,
                // rompiendo la relacion de los objetos.
                active: {
                    ...action.payload
                }
            }
        case types.notesAddNew: 
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            return {
                // envio el spred del state para que los datos que no cambiaron no se amodifiquen
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id 
                    ? action.payload.note
                    : note
                )
            }
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }
        case types.notesLogoutCleaning:
            return { 
                ...state,
                active: null,
                notes: []
            }
        default:
            return state;
    }
}