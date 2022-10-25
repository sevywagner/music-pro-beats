import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBgKJQlES0cJy_j1o3Llz5BpibyRxSQ6Ig",
    authDomain: "music-pro-beats.firebaseapp.com",
    databaseURL: "https://music-pro-beats-default-rtdb.firebaseio.com",
    projectId: "music-pro-beats",
    storageBucket: "music-pro-beats.appspot.com",
    messagingSenderId: "782270761596",
    appId: "1:782270761596:web:68ce4f52d321ddae40d7f9",
    measurementId: "G-8WY5V26LJW"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);