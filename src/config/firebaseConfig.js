import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCXCEgww35ond8R0uhfAfPgYLqant4SHWA",
    authDomain: "todo-hw3-bcaac.firebaseapp.com",
    databaseURL: "https://todo-hw3-bcaac.firebaseio.com",
    projectId: "todo-hw3-bcaac",
    storageBucket: "todo-hw3-bcaac.appspot.com",
    messagingSenderId: "421650547287",
    appId: "1:421650547287:web:377efd86913e64b39e9912",
    measurementId: "G-YMY6L2WMPY"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;