import { getFirestore } from 'firebase/firestore'; 
import app from './firebase-config';

export const Db = getFirestore(app);