import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail, Auth} from "firebase/auth";
import { PasswordEntryBox, PasswordConfirmingUnit } from "./passwordUIClasses";
import {handleFirebasePromise} from "../firebasePromiseResults";


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
    emailInput.autocomplete = "email"
    emailInput.setAttribute("required", "required")
    // emailInput.addEventListener("keyup", (function(keyEvent) {
    // 	if (keyEvent.key === "Enter") {
    // 		this.emailEntryForm.requestSubmit()
    // 	}
    // }).bind(this))

    this.emailEntryForm.appendChild(emailInput)


    let continueButton = document.createElement("button")
    continueButton.innerHTML = "Continue"
    // continueButton.addEventListener("click", (function() {
    // 	this.emailEntryForm.requestSubmit()
    // }).bind(this))
    this.emailEntryForm.appendChild(continueButton)

    let cancelButton = document.createElement("button")
    cancelButton.innerHTML = "Cancel"
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

    if (loginProviders.length > 0 && !loginProviders.includes("password")) {
      //The user cannot log in with email password.
      let message = `This account has no password. You must use a social login (previously used ${loginProviders.join(", ")})`
      alert(message)
      return
    }

    this.clearContainer()

    let loginSubmissionForm = document.createElement("form")

    this.container.appendChild(loginSubmissionForm)

    let emailDisplayInput = document.createElement("input")
    emailDisplayInput.type = "email"
    emailDisplayInput.autocomplete = "email"
    emailDisplayInput.value = emailAddress
    emailDisplayInput.setAttribute("readonly", "readonly")
    loginSubmissionForm.appendChild(emailDisplayInput)

    let submitButton = document.createElement("button")

    let passwordUnit;
    if (loginProviders.includes("password")) {
      //Bring up the email password form.
      submitButton.innerText = "Log In"
      passwordUnit = new PasswordEntryBox({
        hidden: true,
        minLength: 6,
        autoComplete: "current-password",
        placeholder: "Enter Password..."
      })
      loginSubmissionForm.appendChild(passwordUnit.container)

      //Forgot Password Button
      let forgotPasswordButton = document.createElement("button")
      forgotPasswordButton.innerHTML = "Forgot Password"
      forgotPasswordButton.addEventListener("click", (function() {
        sendPasswordResetEmail(this.auth, emailAddress)
        alert("Password Reset Email Sent")
      }).bind(this))
      loginSubmissionForm.appendChild(forgotPasswordButton)
    }
    else if (loginProviders.length === 0) {
      //Bring up the create password form
      submitButton.innerText = "Sign Up"
      passwordUnit = new PasswordConfirmingUnit({
        hidden: true,
        minLength: 6,
        autoComplete: "new-password"
      })
      loginSubmissionForm.appendChild(passwordUnit.container)
    }

    loginSubmissionForm.addEventListener("submit", (function(e) {
      console.warn("Submitted")
      e.preventDefault()
      history.replaceState(null, "") //Emulate a navigation.
      if (loginProviders.includes("password")) {
        handleFirebasePromise(signInWithEmailAndPassword(this.auth, emailAddress, passwordUnit.getValue()));
      }
      else {
        handleFirebasePromise(createUserWithEmailAndPassword(this.auth, emailAddress, passwordUnit.getValue()))
      }
    }).bind(this))


    loginSubmissionForm.appendChild(submitButton)

    //Button to back out and change email
    let backButton = document.createElement("button")
    backButton.innerText = "Back"
    backButton.addEventListener("click", (function() {
      this.requestEmail()
    }).bind(this))
    loginSubmissionForm.appendChild(backButton)

  }
}



export {EmailLoginInterface}