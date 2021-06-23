import { IPerryOptions, IPerryStore } from '@perry/perry-interfaces';
import FeatureToggleStore from '../feature-toggle-store';
import Features from '../features';

const createHandlerFactory =
  (instance: Console, property: string | number | symbol) =>
  (enabled: boolean, store: IPerryStore) =>
  <T>(...params: T[]) => {
    if (enabled) {
      store.write({
        name: 'console',
        params,
        property,
      });
    }

    return instance[property](...params);
  };

export default function applyConsoleProxy(
  options: IPerryOptions,
  store: IPerryStore
): void {
  (window.console as any) = new Proxy(window.console, {
    get(instance, property) {
      if (!FeatureToggleStore.is(Features.CONSOLE_LISTENER)) {
        return instance[property];
      }

      const handlerFactory = createHandlerFactory(instance, property);

      if (property in instance) {
        switch (property) {
          case 'log':
          case 'warn':
          case 'error':
            return handlerFactory(options[property], store);

          default:
            return instance[property];
        }
      }

      return undefined;
    },
  });
}
