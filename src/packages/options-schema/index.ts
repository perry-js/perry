import object from "yup/lib/object";
import boolean from "yup/lib/boolean";

export default object({
  credentials: object(),
  clearOnReload: boolean(),
  log: boolean(),
  warn: boolean(),
  error: boolean(),
  cookies: boolean(),
  localStorage: boolean(),
  sessionStorage: boolean(),
  clicks: boolean(),
  ignoreScriptErrors: boolean()
}).noUnknown();
