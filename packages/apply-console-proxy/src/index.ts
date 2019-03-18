import { IPerryOptions } from '@perry/perry-interfaces';
import writeToStore from '@perry/write-to-store';
import Features from '@perry/features';
import FeatureToggleStore from '@perry/feature-toggle-store';

type ConsoleCallSignature = (...params: any[]) => void;
type Handler = (enabled: boolean) => ConsoleCallSignature;
type HandlerFactory = (instance: Console, property: string | number | symbol) => Handler;

const createHandlerFactory: HandlerFactory =
  (instance: Console, property: string): Handler =>
    (enabled: boolean): ConsoleCallSignature =>
      (...params: any[]) => {
        if (enabled) {
          writeToStore({
            name: "console",
            params,
            property,
          });
        }
        
        return instance[property](...params);
      };

export default function applyConsoleProxy(options: IPerryOptions): void {
  (window.console as any) = new Proxy(window.console, {
    get(instance, property) {
      if (!FeatureToggleStore.is(Features.CONSOLE_LISTENER)) {
        return instance[property];
      }

      const handlerFactory = createHandlerFactory(instance, property);

      if (property in instance) {
        switch (property) {
          case "log":
          case "warn":
          case "error":
            return handlerFactory(options[property]);

          default:
            return instance[property];
        }
      }

      return undefined;
    },
  });
}