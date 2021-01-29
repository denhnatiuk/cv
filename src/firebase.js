/**
*  available firebase services:
*  firebase-app - The core firebase client (required).
*  firebase-auth - Firebase Authentication (optional).
*  firebase-database - The Firebase Realtime Database (optional).
*  firebase-firestore - Cloud Firestore (optional).
*  firebase-storage - Firebase Storage (optional).
*  firebase-messaging - Firebase Cloud Messaging (optional).
*  firebase-functions - Firebase Cloud Functions (optional).
*
*  google-cloud - Server side firebase-storage for Node.JS env
*/
import dotenv from "dotenv";

const firebaseSDK = {
        "app":"https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js",
  "analytics":"https://www.gstatic.com/firebasejs/7.11.0/firebase-analytics.js",
};
const process = {};
process.env = {
  "FIREBASE_API_KEY":"AIzaSyCyXdKbHVXrG7gwAqC3Juqtkacdc9REjTY"
  , "FIREBASE_PROJECT_ID":"cv-den-hnatiuk"
  , "FIREBASE_MESSAGING_SENDER_ID":"444371413430"
  , "FIREBASE_APP_ID":"1:444371413430:web:1c58a6ebf24358bc75f917"
  , "FIREBASE_MEASUREMENT_ID":"G-8GC7QLRKZH"
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY
  , projectId: process.env.FIREBASE_PROJECT_ID
  , authDomain: process.env.FIREBASE_PROJECT_ID + ".firebaseapp.com"
  , databaseURL: "https://" + process.env.FIREBASE_PROJECT_ID + ".firebaseio.com"
  , storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com"
  , messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  , appId: process.env.FIREBASE_APP_ID
  , measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
// console.log(firebaseConfig);
// module.export = loadFirebase(firebaseSDK){
function loadFirebase(firebaseSDK){
// export default function loadFirebase(firebaseSDK){
  if (firebaseSDK.hasOwnProperty('app')){
    for (let [key,value] of Object.entries(firebaseSDK)) {
      async () => {
        await import(value)
        // .then(
          console.log(key)
          value.hasOwnProperty(initializeApp) && firebase.initializeApp(firebaseConfig)
          // firebase.hasOwnProperty(initializeApp) && firebase.initializeApp(firebaseConfig)
          // firebase.hasOwnProperty(analytics) && firebase.analytics()
        // );
      }
    }
  }
};
const Firebase = loadFirebase(firebaseSDK);
export default Firebase;
// }();
