import {
    QueryDocumentSnapshot,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
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
    const docRef = doc(firestore, collectionName, id)
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

export async function addData(collectionName: string, data: any, id?: string) {
    let docRef

    if (id) {
        docRef = doc(collection(firestore, collectionName), id)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
            throw new Error(`Data dengan ID : ${id} sudah ada.`)
        }
    } else {
        docRef = doc(collection(firestore, collectionName))
    }

    await setDoc(docRef, data)
}

export async function updateData(
    collectionName: string,
    id: string,
    data: any
) {
    const docRef = doc(firestore, collectionName, id)
    await updateDoc(docRef, data)
}

export async function deleteData(collectionName: string, id: string) {
    const docRef = doc(firestore, collectionName, id)
    await deleteDoc(docRef)
}

export async function signInWithGoogle(data: any, callback: Function) {
    const q = query(
        collection(firestore, 'users'),
        where('email', '==', data.email)
    )

    const querySnapshot = await getDocs(q)
    const user = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    if (user.length > 0) {
        callback(user[0])
    } else {
        return null
    }
}
