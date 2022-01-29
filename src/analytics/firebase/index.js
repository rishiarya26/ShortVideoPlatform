// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const initFirebase=()=>
{// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU4dxRtd2Gjbp1UMQkN2F9lAMOYjehwhc",
  authDomain: "hipi-c215c.firebaseapp.com",
  projectId: "hipi-c215c",
  storageBucket: "hipi-c215c.appspot.com",
  messagingSenderId: "407565129624",
  appId: "1:407565129624:web:24931d52271452f2d2bded",
  measurementId: "G-QBRTT7MP70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'Test event');
}

export const toTrackFirebase = ({event, properties={}}) =>{
    const analytics = getAnalytics();
    logEvent(analytics, event, properties);
}

