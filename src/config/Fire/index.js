// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD5A4AVviPV2vy1QtnNTl-qM9Li-jI3RCQ',
  authDomain: 'docapp-01.firebaseapp.com',
  databaseURL: 'https://docapp-01-default-rtdb.firebaseio.com/',
  projectId: 'docapp-01',
  storageBucket: 'docapp-01.appspot.com',
  messagingSenderId: '852616421218',
  appId: '1:852616421218:web:ad220f7bcb030b3919963b',
};

// Initialize Firebase
const Fire = initializeApp(firebaseConfig);
// const database = getDatabase(Fire)

export default Fire;
