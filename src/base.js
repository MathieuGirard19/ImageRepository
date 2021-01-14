import firebase from 'firebase';
import "firebase/storage";

{/* <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>

https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js"></script> */}

var config = {
    apiKey: "AIzaSyB5DOgKEJRorRjJJW6dXmp7a3j-YZP1uU0",
    authDomain: "shopify-image-repo-606fb.firebaseapp.com",
    databaseURL: "https://shopify-image-repo-606fb-default-rtdb.firebaseio.com",
    projectId: "shopify-image-repo-606fb",
    storageBucket: "shopify-image-repo-606fb.appspot.com",
    messagingSenderId: "6708771276",
    appId: "1:6708771276:web:7abab8943f1724fc400569",
    measurementId: "G-9FDP75EF88"
};

const app = firebase.initializeApp(config);
const db = firebase.database();
const storage = firebase.storage();
 
export { db, storage, app }