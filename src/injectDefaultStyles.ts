function createEmptyStylesheet() {
  let appendToTarget = document.head ?? document.body ?? document.documentElement

  let ourStyleSheet = document.createElement("style")
  ourStyleSheet.title = "defaultStylesUIForFirebaseAuth"
  appendToTarget.appendChild(ourStyleSheet)

  // console.log(document.styleSheets, document.styleSheets.length - 1)
  return document.styleSheets[document.styleSheets.length - 1]
}

function injectDefaultStyles() {
  let stylesheetTarget = createEmptyStylesheet()

  let maxButtonWidth = 250
  let paddingAmt = 16

  stylesheetTarget.insertRule(`
    .uiForFirebaseLoginContainer {
      display: inline-block;
      margin: auto;
      width: 100%;
      max-width: ${maxButtonWidth}px;
      position: relative;
      padding: ${paddingAmt}px;
    }
  `)

  stylesheetTarget.insertRule(`
    .loginProviderButton {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: ${maxButtonWidth}px;
      border: 2px solid grey;
      padding: 8px;
      border-radius: 4px;
    }
  `)

  stylesheetTarget.insertRule(`
    .loginProviderButton:not(:first-child) {
      margin-top: 8px;
    }
  `)

  stylesheetTarget.insertRule(`
    .loginProviderButton img {
      max-width: 1.5em;
      max-height: 1.5em;
    }
  `)

  stylesheetTarget.insertRule(`
    .loginProviderButton span {
      font-weight: bold;
      width: 100%;
    }
  `)

  stylesheetTarget.insertRule(`
  .passwordEntryContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }`)


  stylesheetTarget.insertRule(`
  .resetPasswordButton {
    background: none;
    border: none;
    color: darkblue;
    padding: 0;
  }
  `)

  stylesheetTarget.insertRule(`
  .loginErrorMessage {
    color: red;
    margin-top: 8px;
  }
  `)

  stylesheetTarget.insertRule(`
  .loginFlowButton {
    font-size: 1em;
    margin-top: 8px;
    margin-right: 8px;
  }
  `)




  //New styles for floating inputs

  stylesheetTarget.insertRule(`
    .floatingInputWrapper {
      position: relative;
      margin-top: 20px;
      max-width: 400px;
      width: 100%;
    }
  `)

  stylesheetTarget.insertRule(`
.floatingInput {
    font-size: 1em;
    width: 100%;
    padding: 8px 0;
    color: #333;
    border: none;
    border-bottom: 1px solid #ddd;
    transition: border-color 250ms;
    background-color: transparent;
  }
  `)

  stylesheetTarget.insertRule(`
    .floatingInput:focus {
      outline: none;
      border-bottom-color: #777;
    }
  `)

  stylesheetTarget.insertRule(`
    .floatingInput::placeholder {
      color: transparent;
    }
  `)

  stylesheetTarget.insertRule(`
    .floatingInput::-webkit-contacts-auto-fill-button {
      visibility: hidden;
      pointer-events: none;
      position: absolute;
    }
  `)

  stylesheetTarget.insertRule(`
.floatingLabel {
    position: absolute;
    top: 8px;
    left: 0;
    color: #43454e;
    pointer-events: none;
    transform-origin: left center;
    transition: transform 250ms;
    font-family: "Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052,
        serif;
  }
  `)

      stylesheetTarget.insertRule(`
      .floatingInput:focus + .floatingLabel, .floatingInput:not(:placeholder-shown) + .floatingLabel {
    transform: translateY(-100%) scale(0.75);
  }
      `)
}


export { injectDefaultStyles }