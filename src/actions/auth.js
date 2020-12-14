import { firebase, googleAuthProvider } from '../firebase/firebase-config';   

// acciones para el login

import { types } from "../types/types";

export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {
        setTimeout(() => {
            dispatch( login(987, email) );
        }, 2500);    
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                console.log( user );
                dispatch( login( user.uid, user.displayName ) );
            });
    }
}

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }        
})