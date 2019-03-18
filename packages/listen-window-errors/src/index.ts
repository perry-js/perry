import writeToStore from '@perry/write-to-store';
import {Options as PerryOptions} from '@perry/perry-interfaces';
import Features from '@perry/features';
import FeatureToggleStore from '@perry/feature-toggle-store';

const isScriptError = (message: string): boolean =>
  message.toLowerCase().indexOf('script error') > -1

export default function listenWindowErrors(options: PerryOptions): void {
  const handler = function (
    message: string,
    url: string,
    line: number,
    column: number,
    error: any,
  ): void {
    if (!FeatureToggleStore.is(Features.WINDOW_ERROR_LISTENER)) {
      return;
    }

    /** Don't record Scripting errors due to browser security blocks. */
    /** Any solutions for this will be appreciated. */
    /** See: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes */
    const isUnhandableError = isScriptError(message);
    
    if (isUnhandableError && options.ignoreScriptErrors) {
      return;
    }

    options.error && writeToStore({
      name: isUnhandableError
        ? 'script'
        : 'window',
      property: 'onerror',
      params: {
        message,
        url,
        line,
        column,
        stack: error && error.stack,
      }
    });
  }

  window.onerror = handler;
}
