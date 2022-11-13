import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// import { getAnalytics } from "firebase/analytics";

let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_ANALYTICS_ID,
};

Firebase.initializeApp(firebaseConfig);
// const app = Firebase.initializeApp(firebaseConfig);

const auth = Firebase.auth();
const database = Firebase.database();
// const analytics = getAnalytics(app);
export { Firebase, auth, database };
