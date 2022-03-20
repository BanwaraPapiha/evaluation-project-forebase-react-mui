import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'; 
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6fajoLimkYemCOoEkwjh_ux7JQz_EHBc",
  authDomain: "princess-sdream.firebaseapp.com",
  projectId: "princess-sdream",
  storageBucket: "princess-sdream.appspot.com",
  messagingSenderId: "449058243697",
  appId: "1:449058243697:web:0d9454ed7b6e11f97c87d0",
  measurementId: "G-T50VWGPMD2"
};

// export const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);
/////
// export const db = getFirestore(app);
