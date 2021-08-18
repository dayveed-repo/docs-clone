// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCnADFtW_Rk8b3Z1jlWio1B6HuzYDWwyDE",
    authDomain: "fb-clone-a56b6.firebaseapp.com",
    databaseURL: "https://fb-clone-a56b6.firebaseio.com",
    projectId: "fb-clone-a56b6",
    storageBucket: "fb-clone-a56b6.appspot.com",
    messagingSenderId: "357732859713",
    appId: "1:357732859713:web:4786604a149fbe95576bc0",
    measurementId: "G-QBT3L7TH7H"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const db = app.firestore()

export default db;