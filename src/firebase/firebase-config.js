import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBqwo8lVLox-Bz5w_ewt8kqtJORr-7Lkog",
    authDomain: "reactappcurso-8bacd.firebaseapp.com",
    projectId: "reactappcurso-8bacd",
    storageBucket: "reactappcurso-8bacd.appspot.com",
    messagingSenderId: "55121372525",
    appId: "1:55121372525:web:f5f8fafc5c980cdd332664"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}