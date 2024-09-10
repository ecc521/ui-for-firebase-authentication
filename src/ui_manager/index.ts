import {Auth, signInWithPopup} from "firebase/auth";
import {SignInOption} from "../SignInOption";
import {createButtonForProvider} from "./createProviderButton";
import {EmailLoginInterface} from "./EmailLoginInterface";
import {handleFirebasePromise} from "../firebasePromiseResults";

/**
 * Initializes the sign in UI. This will render the sign in options into the target element.
 *
 * @param auth The Firebase Auth instance to use for authentication.
 * @param signInOptions The sign in options to display to the user.
 * @param targetElement The element to render the UI into. This element will be emptied before rendering.
 * */
function Initialize_UI(auth: Auth, signInOptions: SignInOption[], targetElement: HTMLElement) {

  if (signInOptions.length === 0) {
    throw new Error("No sign in options provided. ")
  }

  //Clear the target element
  while (targetElement.lastChild) {targetElement.lastChild.remove()}

  let mainContainer = document.createElement("div")
  mainContainer.classList.add("uiForFirebaseLoginContainer")
  targetElement.appendChild(mainContainer)


  //Create the buttons for sign in.
  for (let signInOption of signInOptions) {
    let button = createButtonForProvider(signInOption)
    mainContainer.appendChild(button)

    button.addEventListener("click", function() {
      if (signInOption.provider === "email") {
        //We will pass this element over to the email login interface.
        //After the email login interface closes, we will recurse and regenerate the UI
        while (mainContainer.lastChild) {mainContainer.lastChild.remove()}

        let emailLoginInterface = new EmailLoginInterface(auth)
        mainContainer.appendChild(emailLoginInterface.container)
        emailLoginInterface.onClose = function() {
          Initialize_UI(auth, signInOptions, targetElement)
        }
      }
      else {
        handleFirebasePromise(signInWithPopup(auth, signInOption.provider))
      }
    })
  }
}

export {Initialize_UI}