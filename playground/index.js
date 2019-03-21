require("preact-cli/lib/lib/webpack/polyfills");

import Perry from '@perry/perry';

if (window) {
  window.Perry = Perry;
}
