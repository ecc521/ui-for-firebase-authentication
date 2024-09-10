/*<div class="floatingInputWrapper">*/
/*<input autocomplete="off" class="input" type="text" id="name" placeholder="Name" />*/
/*<label class="label" for="name">Name</label>*/
/*</div>*/


function wrapInputElement(inputElem: HTMLInputElement): HTMLElement {
  //We will wrap an input element to display floating input labels.

  // TODO: Rename the classes to be more specific so other styles are far less likely to interfere.

  //Create the wrapper element.
  let wrapper = document.createElement("div")
  wrapper.classList.add("floatingInputWrapper")

  //Add the input element
  wrapper.appendChild(inputElem)
  if (!inputElem.id) {
    inputElem.id = "input" + Math.random().toString(36).substring(2)
  }
  inputElem.classList.add("floatingInput")

  //Create the label element
  let label = document.createElement("label")
  label.classList.add("floatingLabel")
  label.htmlFor = inputElem.id
  label.innerHTML = inputElem.placeholder
  wrapper.appendChild(label)

  return wrapper
}

export {wrapInputElement}