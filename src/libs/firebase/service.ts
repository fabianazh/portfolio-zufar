import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore'
import { app, firestore } from './init'

export async function getData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName))
    const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
    }))
    return data
}

export async function getDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(
        doc(collection(firestore, collectionName), id)
    )
    const data = snapshot.data()
    return data
}

export async function signIn(email: string) {
    const q = query(collection(firestore, 'users'), where('email', '==', email))

    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    if (data.length > 0) {
        return data[0]
    } else {
        return null
    }
}
