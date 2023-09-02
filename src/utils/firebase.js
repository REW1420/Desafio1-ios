// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvsOrW5yV2bWWndSNf9Tp4XCH61mPWxAU",
  authDomain: "login-test-664e3.firebaseapp.com",
  projectId: "login-test-664e3",
  storageBucket: "login-test-664e3.appspot.com",
  messagingSenderId: "237111935968",
  appId: "1:237111935968:web:346c512b8f3d589d6de185",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app, {
  persistence: ReactNativeAsyncStorage,
});
