import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'biz--me.firebaseapp.com',
  projectId: 'biz--me',
  storageBucket: 'biz--me.appspot.com',
  messagingSenderId: '831449447684',
  appId: '1:831449447684:web:97fb923d34b55cf119e451',
}

export const app = initializeApp(firebaseConfig)
