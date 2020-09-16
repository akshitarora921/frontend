import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBzDAaVjpwTEg6NTgm9A33fc76OS8IEZdQ",
  authDomain: "whatsapp-clone-9498d.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-9498d.firebaseio.com",
  projectId: "whatsapp-clone-9498d",
  storageBucket: "whatsapp-clone-9498d.appspot.com",
  messagingSenderId: "146399609260",
  appId: "1:146399609260:web:64767723b2d3570c66fa09",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
