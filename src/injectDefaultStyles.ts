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
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      min-height: 40px;
      font-size: 16px;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
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
    align-items: baseline;
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
    margin-top: 4px;
    padding: 4px 0;
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