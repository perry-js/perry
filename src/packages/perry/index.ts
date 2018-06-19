/** Perry Options interface */
import PerryOptions from '../../interfaces/PerryOptions';

/** Options validator, created with Yup. */
import isValidOptions from '../is-valid-options';

/** Default options as a plain js object */
import defaultOptions from '../default-options';

/** Actual console[property] proxy */
import applyConsoleProxy from '../apply-console-proxy';

/** Listens and stores interactions in window.onerror */
import listenWindowErrors from '../listen-window-errors';

/** Clears perry store */
import clearStore from '../clear-store';

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
export default class Perry {
  constructor(options: object = {}) {
    const finalOptions: PerryOptions = {
      ...defaultOptions,
      ...options,
    };

    if (!isValidOptions(finalOptions)) {
      throw new Error("Your options are invalid. Please respect the options schema defined in the docs.");
    }

    finalOptions.clearOnReload && clearStore();
    
    applyConsoleProxy(finalOptions);
    listenWindowErrors(finalOptions);
    renderBugReporter(finalOptions);
  }
};
