import array from "yup/lib/array";
import boolean from "yup/lib/boolean";
import object from "yup/lib/object";

export default object({
  clearOnReload: boolean(),
  clearOnStart: boolean(),
  clicks: boolean(),
  cookies: boolean(),
  enableScreenRecording: boolean(),
  error: boolean(),
  ignoreScriptErrors: boolean(),
  localStorage: boolean(),
  log: boolean(),
  plugins: array(),
  sessionStorage: boolean(),
  warn: boolean(),
}).noUnknown();
