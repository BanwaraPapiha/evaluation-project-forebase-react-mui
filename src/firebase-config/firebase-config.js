import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'; 
// import { getAnalytics } from "firebase/analytics";

// covid fighters account
// const firebaseConfig = {
//   apiKey: "AIzaSyAD_IA0nkyjxPwFZRugCtnVrJp18fZPvvA",
//   authDomain: "covid-fighters-bonus-algorithm.firebaseapp.com",
//   projectId: "covid-fighters-bonus-algorithm",
//   storageBucket: "covid-fighters-bonus-algorithm.appspot.com",
//   messagingSenderId: "209339362108",
//   appId: "1:209339362108:web:27363366e407720a0f0c39"
// };

// new secret email
const firebaseConfig = {
  apiKey: "AIzaSyA5CP8c5Aaz0zQpdgq9L9hNScE9CrZC-oI",
  authDomain: "peer-evaluation-system.firebaseapp.com",
  projectId: "peer-evaluation-system",
  storageBucket: "peer-evaluation-system.appspot.com",
  messagingSenderId: "990182412807",
  appId: "1:990182412807:web:65ae184dba28f3d32150a2",
  measurementId: "G-VMWNBP0HLX"
};

const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);
/////
// export const db = getFirestore(app);