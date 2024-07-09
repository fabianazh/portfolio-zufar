import {
    QueryDocumentSnapshot,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import { firestore } from './init'

export async function getData<T>(collectionName: string): Promise<T[]> {
    const snapshot = await getDocs(collection(firestore, collectionName))
    const data: T[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...(doc.data() as T),
    }))
    return data
}

export async function getDataById<T>(
    collectionName: string,
    id: string
): Promise<T | undefined> {
    const docRef = doc(collection(firestore, collectionName), id)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) {
        return undefined
    }
    const data = {
        id: snapshot.id,
        ...snapshot.data(),
    }
    return data as T
}

export async function getCollectionCount(collectionName: string) {
    const projectsCollection = collection(firestore, collectionName)
    const projectsSnapshot = await getDocs(projectsCollection)
    return projectsSnapshot.size
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

export async function updateData(
    collectionName: string,
    id: string,
    data: any,
) {
    const docRef = doc(firestore, collectionName, id)
    await updateDoc(docRef, data)
}
