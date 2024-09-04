import {Auth} from "firebase/auth";
import {SignInOption} from "../SignInOption";
import { signInWithPopup } from "firebase/auth";
import {createButtonForProvider} from "./createProviderButton";
import {EmailLoginInterface} from "./EmailLoginInterface";


/**
 * Initializes the sign in UI. This will render the sign in options into the target element.
 *
 * @param auth The Firebase Auth instance to use for authentication.
 * @param signInOptions The sign in options to display to the user.
 * @param targetElement The element to render the UI into. This element will be emptied before rendering.
 * */
function Initialize_UI(auth: Auth, signInOptions: SignInOption[], targetElement: HTMLElement) {

  //Empty the target element.
  while (targetElement.firstChild) {
    targetElement.firstChild.remove()
  }

  if (signInOptions.length === 0) {
    throw new Error("No sign in options provided. ")
  }

  //Create the buttons for sign in.
  for (let signInOption of signInOptions) {
    let button = createButtonForProvider(signInOption)
    targetElement.appendChild(button)

    button.addEventListener("click", function() {
      if (signInOption.provider !== "email") {
        signInWithPopup(auth, signInOption.provider)
      }
      else {
        targetElement.appendChild(new EmailLoginInterface(auth).container)
      }
    })
  }
}

export {Initialize_UI}