import {Options as PerryOptions} from '@perry/perry-interfaces';
import writeToStore from '@perry/write-to-store';
import Features from '@perry/features';
import FeatureToggleStore from '@perry/feature-toggle-store';

const createHandlerFactory: Function =
  (instance: Console, property: string): Function =>
    (enabled: boolean): Function =>
      (...params: Array<any>) => {
        enabled && writeToStore({
          name: 'console',
          params,
          property,
        });

        return instance[property](...params);
      }

export default function applyConsoleProxy(options: PerryOptions): void {
  (window.console as any) = new Proxy(window.console, {
    get: function(instance, property) {
      if (!FeatureToggleStore.is(Features.CONSOLE_LISTENER)) {
        return instance[property];
      }

      const handlerFactory = createHandlerFactory(instance, property);

      if (property in instance) {
        switch(property) {
          case 'log':
          case 'warn':
          case 'error':
            return handlerFactory(options[property]);

          default:
            return instance[property];
        }
      }

      return undefined;
    }
  })
}
