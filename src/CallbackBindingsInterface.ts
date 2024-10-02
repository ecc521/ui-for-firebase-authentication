/**
 * Interface specifying the required callbacks for this plugin.
 * */
interface CallbackBindingsInterface {
  /**
   * @param email The email to sign in with.
   * @param password The password to sign in with.
   *
   * @returns A promise that resolves when sign in is complete.
   * @throws {Error} An error with a user-presentable message property
   * */
  signInWithEmailPassword: (email: String, password: String) => Promise<any>,

  /**
   * @param email The email to create an account with.
   * @param password The password to create an account with.
   *
   * @returns A promise that resolves when account creation is complete.
   * @throws {Error} An error with a user-presentable message property
   * */
  createUserWithEmailPassword: (email: String, password: String) => Promise<any>,

  /**
   * @param email The email to send a password reset to
   *
   * @returns A promise that resolves when email is sent
   * @throws {Error} An error with a user-presentable message property
   * */
  sendPasswordResetEmail: (email: String) => Promise<any>,

  /**
   * @param email The email to check for sign in methods
   *
   * @returns A promise that resolves with the sign in methods for the email.
   * @throws {Error} An error with a user-presentable message property
   * */
  fetchSignInMethodsForEmail: (email: String) => Promise<string[]>,

  /**
   * @param provider The provider to sign in with.
   *
   * @returns A promise that resolves when sign in is complete.
   * @throws {Error} An error with a user-presentable message property
   * */
  signInWithProvider: (provider: any) => Promise<any>,
}

export {CallbackBindingsInterface}