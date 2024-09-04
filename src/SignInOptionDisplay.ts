interface SignInOptionDisplay {
  /** Name of the provider on the button */
  name: string,

  /** Icon for the provider. Strongly recommended. */
  icon?: string, //URL to the icon, can be dataURL

  /** CSS color string for background */
  backgroundColor: string,

  /** CSS color string for text */
  color: string,

  /** CSS filter string for the icon (in case it needs to be inverted or modified). Optional. */
  iconFilter?: string
}

export {SignInOptionDisplay}