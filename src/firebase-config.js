import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyCuYdR7oF_JDwo7iNmOXpf1ZfHRRuUj2Po",
	authDomain: "todo-app-1760d.firebaseapp.com",
	projectId: "todo-app-1760d",
	storageBucket: "todo-app-1760d.appspot.com",
	messagingSenderId: "757419882818",
	appId: "1:757419882818:web:e386bbf6240ce4774570db",
	measurementId: "G-XKG0KSFXFK"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore();