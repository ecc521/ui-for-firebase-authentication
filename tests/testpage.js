//Prepare firebase
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider } from "firebase/auth";

//This is the firebase config for the test project.
const firebaseConfig = {
  apiKey: "AIzaSyDHH8vZAF_VkRkSR_tQFeMPRuheZGOn4U8",
  authDomain: "ui-for-firebase-authentication.firebaseapp.com",
  projectId: "ui-for-firebase-authentication",
  storageBucket: "ui-for-firebase-authentication.appspot.com",
  messagingSenderId: "1004482444805",
  appId: "1:1004482444805:web:9d23441e7549febc03a66c",
  measurementId: "G-TBK8BWZVXK"
};

const app = initializeApp(firebaseConfig);

let auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)


//Add some additional styles of ours
let cssToInject = `
.uiForFirebaseLoginContainer {
  background: white;
}
`
let styleElem = document.createElement("style")
styleElem.innerText = cssToInject
document.head.append(styleElem)


//Prepare UI
let targetElem = document.createElement("div")
document.body.append(targetElem)
targetElem.style.display = "flex"


import {Initialize_UI, injectDefaultStyles, Display_Templates} from "../dist/index.js";

let googleProvider = new GoogleAuthProvider()
let appleProvider = new OAuthProvider()
let facebookProvider = new FacebookAuthProvider()

//Add email scope.
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email")
appleProvider.addScope("email")
facebookProvider.addScope("email")

let providers = [
  {
    provider: googleProvider,
    display: Display_Templates.Google_Light
  },
  {
    provider: appleProvider,
    display: Display_Templates.Apple_Dark
  },
  {
    provider: "email",
    display: Display_Templates.Email_Dark
  },
]

Initialize_UI(auth, providers, targetElem)

injectDefaultStyles() //We can't do this immediately due to issues with hot reloading.
document.documentElement.style.background = "#eee"
