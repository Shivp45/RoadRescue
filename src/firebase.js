import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "key",
    authDomain: "domain",
    projectId: "id",
    storageBucket: "bucketID",
    messagingSenderId: "SenderID",
    appId: "ID",
    measurementId: "ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
