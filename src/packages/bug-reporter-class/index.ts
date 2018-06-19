/** Options validator, created with Yup. */
import isValidOptions from '../is-valid-options';

/** Default options as a plain js object */
import defaultOptions from '../default-options';

/**
 * This is the UI renderer.
 *
 * It is a wrapper for preact, preact-dom and 
 * the required UI components for the tool.
 */
import renderBugReporter from '../render-bug-reporter';

/**
 * This is the actual instantiator.
 *
 * This is only a class wrapper to expose
 * a nice API for users of this tool.
 */
export default class BugReporter {
  constructor(options = {}) {
    const finalOptions = {
      ...defaultOptions,
      ...options,
    };

    if (!isValidOptions(finalOptions)) {
      throw new Error("Your options are invalid. Please respect the options schema defined in the docs.");
    }

    renderBugReporter(finalOptions);
  }
};