import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAhH1rvRqvv_6q2qY7SWE9sjqEd0GTgFQs",
  authDomain: "timetable-pulse.firebaseapp.com",
  projectId: "timetable-pulse",
  storageBucket: "timetable-pulse.firebasestorage.app",
  messagingSenderId: "1050684371197",
  appId: "1:1050684371197:web:021bfd024a6350cc128e94",
  measurementId: "G-6Z1VYDQBMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);