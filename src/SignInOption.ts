import {OAuthProvider} from "firebase/auth";
import {SignInOptionDisplay} from "./SignInOptionDisplay";

interface SignInOption {
  /** Provider to use for authentication, or "email" for email/password. */
  provider: OAuthProvider | "email" | null,

  /** Instructions for rendering this sign in option. */
  display: SignInOptionDisplay
}

export {SignInOption}