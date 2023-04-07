import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

//generate your own keys here
const firebaseConfig = {
  apiKey: "AIzaSyAZmn188jyVNq3XdoRq3MTbC4fNGAHiXlg",
  authDomain: "thedojosite-bb8899.firebaseapp.com",
  projectId: "thedojosite-bb8899",
  storageBucket: "thedojosite-55209.appspot.com",
  messagingSenderId: "6763748378449",
  appId: "1:6763748378449:web:25ac77cd9e43d5c27ed39d"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }