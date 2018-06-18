import defaultOptions from '../default-options';
import renderBugReporter from '../render-bug-reporter';

export default class BugReporter {
  constructor(options = {}) {
    const finalOptions = {
      ...defaultOptions,
      ...options,
    };

    /** TODO: Validate final options before rendering. */

    renderBugReporter(finalOptions);
  }
};