import { IPerryOptions, IPerryStore } from '@perry/perry-interfaces';
import FeatureToggleStore from '../feature-toggle-store';
import Features from '../features';

const isScriptError = (message: string): boolean =>
  message.toLowerCase().indexOf('script error') > -1;

export default function listenWindowErrors(
  options: IPerryOptions,
  store: IPerryStore
) {
  const handler = (
    message: string,
    url: string,
    line: number,
    column: number,
    error: any
  ): void => {
    if (!FeatureToggleStore.is(Features.WINDOW_ERROR_LISTENER)) {
      return;
    }

    if (!options.error) {
      return;
    }

    /** Don't record Scripting errors due to browser security blocks. */
    /** Any solutions for this will be appreciated. */
    /** See: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes */
    const isUnhandableError = isScriptError(message);

    if (isUnhandableError && options.ignoreScriptErrors) {
      return;
    }

    store.write({
      name: isUnhandableError ? 'script' : 'window',
      params: {
        column,
        line,
        message,
        stack: error && error.stack,
        url,
      },
      property: 'onerror',
    });
  };

  window.onerror = handler;
}
