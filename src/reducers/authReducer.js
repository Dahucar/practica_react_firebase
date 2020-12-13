import { types } from "../types/types";

/*
    Cuando no se este logeado el state estara vacio.
    cuando se logee el state será
    {
        uid: asdasdasda,
        name: 'Daniel
    }
*/

// el "state" siempre debe regresar un dato, ya sea vacio ( {} ) o bien otra información ( {name:'Daniel'} )
// no debe ser null ni undefined
export const authReducer = ( state = { uid: 123 }, action ) => {
    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return { }
        default:
            return state;
    }
}