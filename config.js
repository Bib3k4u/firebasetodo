import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCtS4x-QEjVAMxmhqNy6BSDMonCLxps6Mo",
    authDomain: "todoapp-a93d7.firebaseapp.com",
    projectId: "todoapp-a93d7",
    storageBucket: "todoapp-a93d7.appspot.com",
    messagingSenderId: "810269419941",
    appId: "1:810269419941:web:96efe6401779fd38c4604c",
    measurementId: "G-8SKJHQ4E68"
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};