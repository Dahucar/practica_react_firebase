import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';   

// acciones para el login

import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {
        dispatch( startLoading() );
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({user}) => {
                dispatch( finishLoading() );
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch(err => {
                dispatch( finishLoading() );
                console.log(err);
                Swal.fire('Error', err.message, 'error');
            });  
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

export const startRegister = ( email, password, name ) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async ({ user }) => {
                await user.updateProfile({ displayName: name });
                console.log( user );
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( err => {
                console.log( err );
                Swal.fire('Error', err.message, 'error');
            });
    }
}

export const startLogout = () => {
    return  async ( dispatch ) => {
        await firebase.auth().signOut();
        dispatch( logout() );
    }
}

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }        
})

export const logout = () => ({
    type: types.logout
})