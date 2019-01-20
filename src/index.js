require("preact-cli/lib/lib/webpack/polyfills");

import Perry from './packages/perry';

if (window) {
  window.Perry = Perry;
}