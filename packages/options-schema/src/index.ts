import object from 'yup/lib/object';
import boolean from 'yup/lib/boolean';
import array from 'yup/lib/array';

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
