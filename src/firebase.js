import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBm9ll4XIqL5oW2-xq49PmkDUbxERTJvf8",
    authDomain: "rivendell-d6e99.firebaseapp.com",
    projectId: "rivendell-d6e99",
    storageBucket: "rivendell-d6e99.firebasestorage.app",
    messagingSenderId: "155957508251",
    appId: "1:155957508251:web:5ad5e9e7dd0c44fea5ee3e",
    measurementId: "G-P22BWX7YSC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);