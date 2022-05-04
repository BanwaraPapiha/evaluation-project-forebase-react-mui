import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'; 
// import { getAnalytics } from "firebase/analytics";

// banwara account
const firebaseConfig = {
  apiKey: "AIzaSyC6fajoLimkYemCOoEkwjh_ux7JQz_EHBc",
  authDomain: "princess-sdream.firebaseapp.com",
  projectId: "princess-sdream",
  storageBucket: "princess-sdream.appspot.com",
  messagingSenderId: "449058243697",
  appId: "1:449058243697:web:0d9454ed7b6e11f97c87d0",
  measurementId: "G-T50VWGPMD2"
};

// manabeel account
// const firebaseConfig = {
//   apiKey: "AIzaSyAD_IA0nkyjxPwFZRugCtnVrJp18fZPvvA",
//   authDomain: "covid-fighters-bonus-algorithm.firebaseapp.com",
//   projectId: "covid-fighters-bonus-algorithm",
//   storageBucket: "covid-fighters-bonus-algorithm.appspot.com",
//   messagingSenderId: "209339362108",
//   appId: "1:209339362108:web:27363366e407720a0f0c39"
// };

const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);
/////
// export const db = getFirestore(app);