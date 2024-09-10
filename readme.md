# UI for Firebase Authentication

### Alternative to Firebase UI supporting Firebase v9+ 

Email Enumeration Protection MUST be disabled for this plugin to work. This plugin relies on email enumerating features to mimic FirebaseUI behavior. 


Not yet implemented:
- Custom password strength requirements (only minimum length supported)
- Phone & Email Link Authentication
- 2FA

Test cases have not yet been constructed. 


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
import { initializeUI, injectDefaultStyles } from "ui-for-firebase-authentication";

injectDefaultStyles(); //Adds the default CSS for the sign in UI to the document. This uses CSSStyleSheet so will not violate CSP. 

//Provide a target div in which the UI will be rendered.
let targetDiv = document.createElement("div");

//Provide SignInOption(s) to render. You can use templates to help with this. 

initializeUI(auth, targetDiv);
```
