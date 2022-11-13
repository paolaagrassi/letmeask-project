import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// import { getAnalytics } from "firebase/analytics";

let firebaseConfig = {
  apiKey: "AIzaSyDIZodR1wQNkhYFOK7kOpZQNCtF3T6aHdQ",
  authDomain: "letmeask-fbf26.firebaseapp.com",
  databaseURL: "https://letmeask-fbf26-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "letmeask-fbf26",
  storageBucket: "letmeask-fbf26.appspot.com",
  messagingSenderId: "1002661843021",
  appId: "1:1002661843021:web:8acd97e661a833049fcc04",
  measurementId: "G-2YC2MHZN2S"
};

Firebase.initializeApp(firebaseConfig);
// const app = Firebase.initializeApp(firebaseConfig);

const auth = Firebase.auth();
const database = Firebase.database();
// const analytics = getAnalytics(app);
export { Firebase, auth, database };
