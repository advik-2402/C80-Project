import firebase from 'firebase';
require('@firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCSnga-6WYaIanSIyAHlfTCmjsP56_wFOo",
  authDomain: "barter-system-app-1efd6.firebaseapp.com",
  databaseURL: "https://barter-system-app-1efd6.firebaseio.com",
  projectId: "barter-system-app-1efd6",
  storageBucket: "barter-system-app-1efd6.appspot.com",
  messagingSenderId: "37930309322",
  appId: "1:37930309322:web:c1b29f86337157e04f0633"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();