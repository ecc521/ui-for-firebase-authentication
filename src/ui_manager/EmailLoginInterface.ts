import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail, Auth} from "firebase/auth";
import { PasswordEntryBox, PasswordConfirmingUnit } from "./passwordUIClasses";
import {getFirebaseResultOrErrorMessage} from "../firebasePromiseResults";
import {wrapInputElement} from "./floatingInputWrapper";


//We JUST need a password form for changing passwords.
//We need the full flow for other stuff.

class EmailLoginInterface {
  container = document.createElement("div") //Container for the login interface

  emailEntryForm = document.createElement("form") //Form used to choose the email being used.
  auth: Auth = null //Firebase Auth instance

  onClose = null //Callback to be called when the interface is closed.

  constructor(auth: Auth) {
    this.auth = auth
    this.container.classList.add("emailLoginInterface")

    this.emailEntryForm.addEventListener("submit", (function(e) {
      e.preventDefault()
      history.replaceState(null, "") //Emulate a navigation.
      this.continueWithEmail(emailInput.value)
    }).bind(this))

    let emailInput = document.createElement("input")
    emailInput.type = "email"
    emailInput.placeholder = "Enter Email..."
    emailInput.autocomplete = "username"
    emailInput.setAttribute("required", "required")

    this.emailEntryForm.appendChild(wrapInputElement(emailInput))


    let continueButton = document.createElement("button")
    continueButton.innerHTML = "Continue"
    continueButton.classList.add("loginFlowButton")
    this.emailEntryForm.appendChild(continueButton)

    let cancelButton = document.createElement("button")
    cancelButton.classList.add("loginFlowButton")
    cancelButton.innerHTML = "Cancel"
    cancelButton.type = "button"
    cancelButton.addEventListener("click", (function() {
      this.container.remove()
      this?.onClose()
    }).bind(this))
    this.emailEntryForm.appendChild(cancelButton)

    this.requestEmail()
  }

  clearContainer() {
    while (this.container.lastChild) {
      this.container.lastChild.remove()
    }
  }

  requestEmail() {
    this.clearContainer()
    this.container.appendChild(this.emailEntryForm)
  }

  async continueWithEmail(emailAddress) {
    let loginProviders;
    try {
      loginProviders = await fetchSignInMethodsForEmail(this.auth, emailAddress)
    }
    catch (e) {
      console.error(e)
      alert("Error with Firebase: " + e.message)
      return;
    }

    this.clearContainer()

    let loginSubmissionForm = document.createElement("form")

    this.container.appendChild(loginSubmissionForm)

    let emailDisplayInput = document.createElement("input")
    emailDisplayInput.type = "email"
    emailDisplayInput.autocomplete = "username"
    emailDisplayInput.value = emailAddress
    emailDisplayInput.setAttribute("readonly", "readonly")
    loginSubmissionForm.appendChild(wrapInputElement(emailDisplayInput))

    let submitButton = document.createElement("button")
    submitButton.classList.add("loginFlowButton")


    //Button to back out and change email
    let backButton = document.createElement("button")
    backButton.innerText = "Back"
    backButton.classList.add("loginFlowButton")
    backButton.type = "button"
    backButton.addEventListener("click", (function() {
      this.requestEmail()
    }).bind(this))

    let resetPasswordButton = document.createElement("button")
    resetPasswordButton.classList.add("resetPasswordButton")
    resetPasswordButton.innerHTML = "Reset Password"
    resetPasswordButton.type = "button"
    resetPasswordButton.addEventListener("click", (function() {
      sendPasswordResetEmail(this.auth, emailAddress)
      errorMessage.innerText = `Password Reset Email Sent to ${emailAddress}. `
    }).bind(this))

    let errorMessage = document.createElement("div")
    errorMessage.classList.add("loginErrorMessage")

    let passwordUnit;

    if (loginProviders.length === 0) {
      //Bring up the create password form
      submitButton.innerText = "Sign Up"
      passwordUnit = new PasswordConfirmingUnit({
        hidden: true,
        minLength: 6,
        autoComplete: "new-password"
      })
    }
    else {
      //Bring up the email password form.
      submitButton.innerText = "Log In"
      passwordUnit = new PasswordEntryBox({
        hidden: true,
        minLength: 6,
        autoComplete: "current-password",
        placeholder: "Enter Password..."
      })
    }
    loginSubmissionForm.appendChild(passwordUnit.container)


    if (!loginProviders.includes("password") && loginProviders.length > 0) {
      //Include warning that user must reset password before they can log in.
      errorMessage.innerText = "This account has no password. You must reset your password before you can log in."
    }

    loginSubmissionForm.addEventListener("submit", (function(e) {
      console.warn("Submitted")
      errorMessage.innerText = ""
      e.preventDefault()
      history.replaceState(null, "") //Emulate a navigation.
      let firebasePromise;
      if (loginProviders.includes("password")) {
        firebasePromise = signInWithEmailAndPassword(this.auth, emailAddress, passwordUnit.getValue());
      }
      else {
        firebasePromise = createUserWithEmailAndPassword(this.auth, emailAddress, passwordUnit.getValue());
      }

      getFirebaseResultOrErrorMessage(firebasePromise).then((res) => {
        if (typeof res === "string") {
          errorMessage.innerText = res
        }
        else {
          errorMessage.innerText = ""
        }
      })

    }).bind(this))


    loginSubmissionForm.appendChild(submitButton)

    loginSubmissionForm.appendChild(backButton)

    //Reset Password Button
    if (loginProviders.length > 0) {
      //No need to reset password if this account hasn't been created yet.
      loginSubmissionForm.appendChild(resetPasswordButton)
    }

    loginSubmissionForm.appendChild(errorMessage)

  }
}



export {EmailLoginInterface}