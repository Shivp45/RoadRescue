import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getFacilities() {
  const snapshot = await getDocs(
    collection(db, "facilities")
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}