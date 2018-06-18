const poly = require("preact-cli/lib/lib/webpack/polyfills");

import BugReporter from './packages/bug-reporter-class';

if (window) {
  window.BugReporter = BugReporter;
}