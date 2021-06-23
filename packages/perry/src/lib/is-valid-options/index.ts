import { IPerryOptions } from '@perry/perry-interfaces';

const expectedTypes = {
  clearOnReload: 'boolean',
  clearOnStart: 'boolean',
  clicks: 'boolean',
  cookies: 'boolean',
  enableScreenRecording: 'boolean',
  error: 'boolean',
  ignoreScriptErrors: 'boolean',
  localStorage: 'boolean',
  log: 'boolean',
  plugins: 'array',
  sessionStorage: 'boolean',
  warn: 'boolean',
};

function throwError(
  property: string,
  currentValue: string,
  expectedType: string
) {
  throw new Error(
    `[Perry Options]: "${property}" was supposed to be of type "${expectedType}", but received "${currentValue}"`
  );
}

function validateValue(
  currentValue: any,
  expectedType: 'array' | 'boolean'
) {
  switch (expectedType) {
    case 'array':
      return Array.isArray(currentValue);
    case 'boolean':
      return typeof currentValue === 'boolean';
    default:
      return false;
  }
}

const checkOptions = (options: IPerryOptions) => {
  for (const property in options) {
    if (options.hasOwnProperty(property)) {
      const currentValue = options[property];
      const expectedType = expectedTypes[property];

      if (!validateValue(currentValue, expectedType)) {
        throwError(property, currentValue, expectedType);
      }
    }
  }
};

const isValidOptions = (options: IPerryOptions) => {
  try {
    checkOptions(options);
    return true;
  } catch (e) {
    /* tslint:disable-next-line */
    console.error(e);
    return false;
  }
};

export default isValidOptions;
