export default interface PerryOptions {
  log: boolean,
  warn: boolean,
  error: boolean,
  clicks: boolean,
  cookies: boolean,
  localStorage: boolean,
  sessionStorage: boolean,
  clearOnReload: boolean,
  clearOnStart: boolean,
  ignoreScriptErrors: boolean,
  enableScreenRecording: boolean,
  /**
   * TODO: Give a type to the Plugin Function signature itself.
   */
  plugins: Array<Function>
};
