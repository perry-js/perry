import array from "yup/lib/array";
import boolean from "yup/lib/boolean";
import object from "yup/lib/object";

export default object({
  log: boolean(),
  warn: boolean(),
  error: boolean(),
  clicks: boolean(),
  cookies: boolean(),
  localStorage: boolean(),
  sessionStorage: boolean(),
  ignoreScriptErrors: boolean(),
  clearOnReload: boolean(),
  clearOnStart: boolean(),
  enableScreenRecording: boolean(),
  plugins: array(),
}).noUnknown();
