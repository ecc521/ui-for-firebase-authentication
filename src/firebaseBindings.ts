import {CallbackBindingsInterface} from "./CallbackBindingsInterface";

import {
  createUserWithEmailAndPassword, fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPopup, Auth, UserCredential
} from "firebase/auth";



function createFirebaseBindings(auth: Auth): CallbackBindingsInterface {
  return {
    signInWithEmailPassword: function(email: string, password: string) {
      return firebaseErrorWrapper(signInWithEmailAndPassword(auth, email, password))
    },
    createUserWithEmailPassword: function(email: string, password: string) {
      return firebaseErrorWrapper(createUserWithEmailAndPassword(auth, email, password))
    },
    sendPasswordResetEmail: function(email: string) {
      return firebaseErrorWrapper(sendPasswordResetEmail(auth, email))
    },
    fetchSignInMethodsForEmail: async function(email: string) {
      return firebaseErrorWrapper(fetchSignInMethodsForEmail(auth, email))
    },
    signInWithProvider: function(provider: any) {
      return firebaseErrorWrapper(signInWithPopup(auth, provider))
    }
  }
}


const codeMap = {
  //User errors
  "auth/user-not-found": "No user found with selected email",
  "auth/email-already-in-use": "An account already exists with this email",
  "auth/wrong-password": "Incorrect Password",
  "auth/weak-password": "Password too weak - must be at least 6 characters",
  "auth/popup-closed-by-user": "Oopsies! Looks like you closed the sign in popup!",

  //Service Problems
  "auth/too-many-requests": "Too many recent requests. You can reset your password or try again later",
  "auth/requires-recent-login": "You must sign in again before you can perform this action",

  //Configuration issues
  "auth/unauthorized-domain": "Configuration Error: Unauthorized Domain",
}

async function firebaseErrorWrapper(prom: Promise<any>) {
  //Wrap an error to create a user-presentable error message.

  return prom.catch((e) => {
    if (codeMap[e.code]) {
      console.error("Error Cause", e)
      throw new Error(codeMap[e.code])
    }
    throw e
  })
}


export { createFirebaseBindings }