import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "helpmeh-9ce86.firebaseapp.com",
  projectId: "helpmeh-9ce86",
  storageBucket: "helpmeh-9ce86.appspot.com",
  messagingSenderId: "755866429866",
  appId: "1:755866429866:web:3c0f536d15695f1cb663d3",
  measurementId: "G-TT1LB5ES29",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default async function uploadImage(imgUrl: string) {
  try {
    const response = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });
    const bytes = new Uint8Array(response.data);
    const imgName = "images/" + Date.now() + ".jpeg";
    const imgRef = ref(storage, imgName);
    await uploadBytes(imgRef, bytes);

    const imageUrl = await getDownloadURL(imgRef);
    return imageUrl;
  } catch (error) {
    throw new Error("Error uploading image");
  }
}
