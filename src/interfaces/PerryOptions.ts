export default interface PerryOptions {
  log: boolean,
  warn: boolean,
  error: boolean,
  clicks: boolean,
  cookies: boolean,
  localStorage: boolean,
  sessionStorage: boolean,
  clearOnReload: boolean,
  ignoreScriptErrors: boolean,
  plugins: Array<Function>
};
