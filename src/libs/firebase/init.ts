// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyD4hVFQuV3inbMQxtJ5g4AKJeYbxSzY2xE',
    authDomain: 'zufarms.firebaseapp.com',
    databaseURL: 'https://zufarms-default-rtdb.firebaseio.com',
    projectId: 'zufarms',
    storageBucket: 'zufarms.appspot.com',
    messagingSenderId: '803017164179',
    appId: '1:803017164179:web:9257ed571259efa0075466',
    measurementId: 'G-FYX4BLNRKK',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// export const analytics = getAnalytics(app)

export const firestore = getFirestore(app)
