import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig: object = {
  apiKey: 'AIzaSyB8ntw3P9or63jhM6ah1ripy2xtkSCoUmI',
  authDomain: 'nhavietac-37509.firebaseapp.com',
  projectId: 'nhavietac-37509',
  storageBucket: 'nhavietac-37509.appspot.com',
  messagingSenderId: '1079086512392',
  appId: '1:1079086512392:web:bb4f2153ccfb6b394f54bd',
  measurementId: 'G-814B5EYWQ0',
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics()

export default firebase;
