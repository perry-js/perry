import PerryOptions from "@/interfaces/PerryOptions";
import FeatureToggleStore from "@/packages/feature-toggle-store";
import Features from "@/packages/features";
import writeToStore from "@/packages/write-to-store";

const createHandlerFactory: Function =
  (instance: Console, property: string): Function =>
    (enabled: boolean): Function =>
      (...params: any[]) => {
        enabled && writeToStore({
          name: "console",
          params,
          property,
        });

        return instance[property](...params);
      };

export default function applyConsoleProxy(options: PerryOptions): void {
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
