
async function handleFirebasePromise(prom) {
  //Handle common Firebase error codes.
  try {
    let res = await prom
    console.log(res)
  }
  catch (e) {
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