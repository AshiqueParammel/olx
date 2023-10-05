import firebase from 'firebase'

import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBvDK09Ismq8mIu98_TTV3Unb7p75j3OM8",
  authDomain: "olxreact-6281b.firebaseapp.com",
  projectId: "olxreact-6281b",
  storageBucket: "olxreact-6281b.appspot.com",
  messagingSenderId: "875172999393",
  appId: "1:875172999393:web:f4e2c8c195f3f16a8747a0"
};
  export  default firebase.initializeApp(firebaseConfig)
  
