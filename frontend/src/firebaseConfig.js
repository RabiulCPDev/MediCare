// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDlb_S6vvdGhAomtc_BS0kU37pLirX87Y4",
  authDomain: "hospital-management-a0f47.firebaseapp.com",
  projectId: "hospital-management-a0f47",
  storageBucket: "hospital-management-a0f47.appspot.com",
  messagingSenderId: "700938484783",
  appId: "1:700938484783:web:8c76c0471d2ec1cca71ada",
  measurementId: "G-ZXEHZ4GZWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { storage };