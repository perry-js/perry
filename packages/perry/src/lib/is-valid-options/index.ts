import { IPerryOptions } from "@perry/perry-interfaces";

const expectedTypes = {
  clearOnReload: "boolean",
  clearOnStart: "boolean",
  clicks: "boolean",
  cookies: "boolean",
  enableScreenRecording: "boolean",
  error: "boolean",
  ignoreScriptErrors: "boolean",
  localStorage: "boolean",
  log: "boolean",
  plugins: "array",
  sessionStorage: "boolean",
  warn: "boolean",
};

function isArray(value) {
  return value && typeof value === "object" && value.constructor === Array;
}

function throwError(property, currentValue, expectedType) {
  throw new Error(
    `[Perry Options]: "${property}" was supposed to be of type "${expectedType}", but received "${currentValue}"`,
  );
}

function shouldThrow(currentValue: any, expectedType: "array" | "boolean") {
  const currentType = typeof currentValue;

  const isNotAnArray = expectedType === "array" && !isArray(currentValue);
  const isNotExpectedType = currentType !== expectedType;

  return isNotAnArray || isNotExpectedType;
}

const checkOptions = (options: IPerryOptions) => {
  for (const property in options) {
    if (!options.hasOwnProperty(property)) {
      const currentValue = options[property];
      const expectedType = expectedTypes[property];

      if (shouldThrow(currentValue, expectedType)) {
        throwError(property, currentValue, expectedType);
      }
    }
  }
};

export default (options: IPerryOptions): boolean => {
  try {
    checkOptions(options);
    return true;
  } catch (e) {
    /* tslint:disable-next-line */
    console.error(e);
    return false;
  }
};
