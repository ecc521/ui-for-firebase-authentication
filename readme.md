# UI for Firebase Authentication

### Alternative to Firebase UI supporting Firebase v9+ 


## Installation

```npm install --save ui-for-firebase-authentication```

## Usage

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //YOUR FIREBASE CONFIG HERE
};

const app = initializeApp(firebaseConfig);

//Accounts
const auth = getAuth(app)

//Now initialize the UI package with the auth module. 
import { initializeUI } from "ui-for-firebase-authentication";

//Provide a target div in which the UI will be rendered.
let targetDiv = document.createElement("div");

//Provide SignInOption(s) to render. You can use templates to help with this. 

initializeUI(auth, targetDiv);
```