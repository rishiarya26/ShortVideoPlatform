// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let initiated = false;

let app = null;
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
app = initializeApp(firebaseConfig);
initiated=true;
// logEvent(analytics, 'Test event');
}

export const trackEvent = (event, properties={}) =>{
    console.log("EVENT **********",event)
   try{ 
    if (!initiated) initFirebase();
    console.log(initiated,'app',app);
    if(app){
        const analytics = getAnalytics(app);   
        logEvent(analytics, event, properties);
        console.log('** FIREBASE **',event,properties);
    }else{
        console.log('no app')
        initFirebase();
        setTimeout(()=>{trackEvent(event,properties);},200); 
    }
}catch(e){
    console.log("error in firebase event",e);
    initFirebase();
}
}

