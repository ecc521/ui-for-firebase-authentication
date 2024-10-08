# UI for Firebase Authentication

### Alternative to Firebase UI supporting Firebase v9+. 

Key Features:
- Support for Firebase v9+ (modular SDK)
- - Support for native Firebase (including [@capacitor-firebase/authentication](https://www.npmjs.com/package/@capacitor-firebase/authentication)).

Requirements:
- Email Enumeration Protection is **NOT** supported, and must be disabled for this plugin to work
  - This requirement is in place to allow for transferring users from the sign-in flow to the sign-up flow if the account does not exist. 


Not yet available (Pull Requests welcome):
- Custom password strength requirements (only minimum length supported)
- Phone & Email Link Authentication
- Anonymous User Upgrades
- 2FA
- Localization


### How the Plugin Works

This plugin provides a UI component that must be hooked up with bindings (see CallbackBindingsInterface).
- Bindings are provided for Firebase Authentication (firebase/auth)
- You can use this plugin with any authentication system provided that you implement CallbackBindingsInterface.


### Dark Mode

This plugin does not adjust colors based on the user's system preferences, however you are welcome to provide your own CSS. 
The color of .floatingLabel can be changed to make the text more visible on darker backgrounds. #ccc or similar is recommended. 



## Installation

```npm install --save ui-for-firebase-authentication```

## Usage

### Step 1: Initialize Firebase
```javascript
//First, initialize Firebase.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //YOUR FIREBASE CONFIG HERE
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
```

### Step 2: Create the UI Component
```javascript
//Now initialize the UI package with the auth module. 
import { initializeUI, injectDefaultStyles, Display_Templates, createFirebaseBindings } from "ui-for-firebase-authentication";

injectDefaultStyles(); //Adds the default CSS for the sign in UI to the document. This uses CSSStyleSheet so will not violate CSP. 

//Provide a target element in which the UI will be rendered. Contents of the target element may be cleared. 
let targetElement = document.createElement("div");

//Provide SignInOption(s) to render. You can use templates to help with this. 
let googleProvider = new GoogleAuthProvider()
let appleProvider = new OAuthProvider()
let facebookProvider = new FacebookAuthProvider()

//Add scopes that you want to request. 
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

initializeUI(createFirebaseBindings(auth), providers, targetElement);
```
