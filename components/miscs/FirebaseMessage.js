import firebase from "firebase"

const config = {
    apiKey: "AIzaSyBu9tS3P8v2Yh73aIOKl8qh9qW-cd5Y-wg",
    authDomain: "infosystems-30eb0.firebaseapp.com",
    projectId: "infosystems-30eb0",
    storageBucket: "infosystems-30eb0.appspot.com",
    messagingSenderId: "317369047189",
    appId: "1:317369047189:web:b7f4304718afe0818ae39c"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}else {
firebase.app(); // if already initialized, use that one
}

export default firebase;
