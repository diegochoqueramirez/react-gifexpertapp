import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDXLED9gTquhfoi56Fh58e9VLhzGz95TFk',
  authDomain: 'react-app-cursos-c6d57.firebaseapp.com',
  projectId: 'react-app-cursos-c6d57',
  storageBucket: 'react-app-cursos-c6d57.appspot.com',
  messagingSenderId: '599617208426',
  appId: '1:599617208426:web:329ab4cf15b3090d360a13',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
