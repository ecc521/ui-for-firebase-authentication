//Users can supply their own providers. Some providers are available by default.

import {Display_Templates} from "./Display_Templates"
import {SignInOptionDisplay} from "./SignInOptionDisplay"
import {SignInOption} from "./SignInOption";

import {Initialize_UI} from "./ui_manager";
import { injectDefaultStyles } from "./injectDefaultStyles"

import {createFirebaseBindings} from "./firebaseBindings";
import {CallbackBindingsInterface} from "./CallbackBindingsInterface";

import {PasswordEntryBox, PasswordConfirmingUnit} from "./ui_manager/passwordUIClasses";

export {
  //Commonly used functions
  Initialize_UI, injectDefaultStyles, createFirebaseBindings,
  //Common Presets
  Display_Templates,
  //Potentially useful UI classes
  PasswordEntryBox, PasswordConfirmingUnit,
  //Typing
  CallbackBindingsInterface ,SignInOption, SignInOptionDisplay,
}