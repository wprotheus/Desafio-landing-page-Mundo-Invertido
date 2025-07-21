import app from './app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

export async function subscribeToHellfireClub(subscription) {
    try {
        const db = getFirestore(app);
        const hellfireClubCollection = collection(db, 'hellfire-club');
        const docRef = await addDoc(hellfireClubCollection, subscription);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao inscrever:', error);
        throw error;
    }
}

export async function getHellfireClubSubscriptions() {
    try {
        const db = getFirestore(app);
        const hellfireClubCollection = collection(db, 'hellfire-club');
        const snapshot = await getDocs(hellfireClubCollection);
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error('Erro ao buscar inscrições:', error);
        throw error;
    }
}