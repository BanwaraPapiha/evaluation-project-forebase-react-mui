import { getFirestore } from 'firebase/firestore'; 
import app from './firebase-config';

// const Db = getFirestore(app);
// export default Db;

export const Db = getFirestore(app);