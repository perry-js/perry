import { IPerryOptions, IPerryStore } from "@perry/perry-interfaces";
import FeatureToggleStore from "../feature-toggle-store";
import Features from "../features";

type ConsoleCallSignature = (...params: any[]) => void;
type Handler = (enabled: boolean, store: IPerryStore) => ConsoleCallSignature;
type HandlerFactory = (instance: Console, property: string | number | symbol) => Handler;

const createHandlerFactory: HandlerFactory =
  (instance: Console, property: string): Handler =>
    (enabled: boolean, store: IPerryStore): ConsoleCallSignature =>
      (...params: any[]) => {
        if (enabled) {
          store.write({
            name: "console",
            params,
            property,
          });
        }

        return instance[property](...params);
      };

export default function applyConsoleProxy(options: IPerryOptions, store: IPerryStore): void {
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
            return handlerFactory(options[property], store);

          default:
            return instance[property];
        }
      }

      return undefined;
    },
  });
}
