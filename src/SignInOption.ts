import {SignInOptionDisplay} from "./SignInOptionDisplay";

interface SignInOption {
  /**
   * Provider should be "email" if email password sign-in is being used.
   * Otherwise, it should be an Object that will be passed to the appropriate callback when
   * signing in with this option is requested.
   * */
  provider: Object | "email" | null,

  /** Instructions for rendering this sign in option. */
  display: SignInOptionDisplay
}

export {SignInOption}