import IPerryOptions from "@/interfaces/IPerryOptions";
import FeatureToggleStore from "@/packages/feature-toggle-store";
import Features from "@/packages/features";
import writeToStore from "@/packages/write-to-store";

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
