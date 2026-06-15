import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import facilities from "./facilities.json";

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
const db = getFirestore(app);

async function upload() {
  for (const facility of facilities) {
    await addDoc(collection(db, "facilities"), facility);
    console.log("Added:", facility.name);
  }

  console.log("Done");
}

upload();