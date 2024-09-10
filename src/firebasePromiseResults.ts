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



async function handleFirebasePromise(prom) {
  //If the Firebase promise returns successfully then we should assume that the form will simply be hidden
  // TODO: Occasional issues with form submission when the form is deleted immediately after???

  try {
    let res = await prom
    console.log(res)
  }
  catch (e) {
    if (e.code === "")
    if (e.code === "auth/user-not-found") {
      alert("No user found with selected email. ")
    }
    else if (e.code === "auth/unauthorized-domain") {
      alert("Error from Auth Provider: Unauthorized Domain")
    }
    else if (e.code === "auth/weak-password") {
      alert("Password too weak - must be at least 6 characters. ")
    }
    else if (e.code === "auth/wrong-password") {
      alert("Incorrect Password. ")
    }
    else if (e.code === "auth/too-many-requests") {
      alert("Too many requests. You can reset your password or try again later. ")
    }
    else if (e.code === "auth/requires-recent-login") {
      //Use reauthenticateWithCredential??
      alert("You must sign in again before you can perform this action. ")
    }
    else {
      console.error(e)
      alert("Unknown Error from Auth Provider: " + e.message)
    }
  }
}

export { handleFirebasePromise }