import object from 'yup/lib/object';
import boolean from 'yup/lib/boolean';
import array from 'yup/lib/array';

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
  plugins: array(),
}).noUnknown();
