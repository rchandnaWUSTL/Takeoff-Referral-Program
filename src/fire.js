import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyADL0J2TqSD6bFVhcdL1EOG8PX-iVFBZCo",
  authDomain: "takeoff-referral-program.firebaseapp.com",
  projectId: "takeoff-referral-program",
  databaseURL: "https://takeoff-referral-program-default-rtdb.firebaseio.com/",
  storageBucket: "takeoff-referral-program.appspot.com",
  messagingSenderId: "456965155597",
  appId: "1:456965155597:web:a435e87f56fee731479e44",
  measurementId: "G-QV1496Q788"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default fire;