function createEmptyStylesheet() {
  let appendToTarget = document.body ?? document.head ?? document.documentElement

  let ourStyleSheet = document.createElement("style")
  ourStyleSheet.title = "defaultStylesUIForFirebaseAuth"
  appendToTarget.appendChild(ourStyleSheet)

  // console.log(document.styleSheets, document.styleSheets.length - 1)
  return document.styleSheets[document.styleSheets.length - 1]
}

function injectDefaultStyles() {
  let stylesheetTarget = createEmptyStylesheet()

  stylesheetTarget.insertRule(`
    .loginProviderButton {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 250px;
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
}


export { injectDefaultStyles }