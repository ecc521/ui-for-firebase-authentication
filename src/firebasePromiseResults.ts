import {UserCredential} from "firebase/auth";

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


async function getFirebaseResultOrErrorMessage(prom: Promise<UserCredential>) {
  try {
    return await prom
  }
  catch (e) {
    if (codeMap[e.code]) {
      return codeMap[e.code]
    }
    else {
      return `Unknown Error ${e.message}`
    }
  }
}


async function handleFirebasePromise(prom) {
  //This function should be phased out and removed.
  let res = await getFirebaseResultOrErrorMessage(prom)
  if (typeof res === "string") {
    alert(res)
  }
  else {
    return res
  }
}

export { handleFirebasePromise, getFirebaseResultOrErrorMessage }