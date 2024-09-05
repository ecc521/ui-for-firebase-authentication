import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";

//We will need the






//Users can supply their own providers. Some providers are available by default.

import {Display_Templates} from "./Display_Templates"
import {SignInOptionDisplay} from "./SignInOptionDisplay"
import {SignInOption} from "./SignInOption";

import {Initialize_UI} from "./ui_manager";
import { injectDefaultStyles } from "./injectDefaultStyles"

export {Initialize_UI, Display_Templates, SignInOption, SignInOptionDisplay, injectDefaultStyles }