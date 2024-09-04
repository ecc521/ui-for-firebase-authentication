import {SignInOption} from "../SignInOption";

/**
 * Creates a button for a sign in provider. This will create a button that can be used to sign in with the provided provider.
 *
 * @param signInOption The sign in option to create a button for.
 * @returns The button element that can be used to sign in with the provided provider.
 * */
function createButtonForProvider(signInOption: SignInOption) {
  //Creates a stylized UI button given the provided parameters. Will NOT add event listeners to the button.
  //All buttons should be the same size (this is sometimes a branding requirement)

  let displayConfig = signInOption.display

  let button = document.createElement("button")
  button.classList.add("loginProviderButton")

  if (displayConfig.icon) {
    //Add an icon, left justified, and centered vertically within the button.
    let imageComponent = document.createElement("img")
    imageComponent.src = displayConfig.icon

    imageComponent.style.filter = displayConfig.iconFilter //We will allow for filters to be applied to the icon (like inverting).

    button.append(imageComponent)
  }

  let textComponent = document.createElement("span")
  textComponent.innerHTML = `Sign in with ${displayConfig.name}`
  button.appendChild(textComponent)


  button.style.backgroundColor = displayConfig.backgroundColor
  button.style.color = displayConfig.color

  return button
}


export {createButtonForProvider}