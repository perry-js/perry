import { IPerryStore } from "@perry/perry-interfaces";
import FeatureToggleStore from "../feature-toggle-store";
import Features from "../features";

const notify = (error: Error, store: IPerryStore): void => {
  if (!FeatureToggleStore.is(Features.NOTIFY_LISTENER)) {
    return;
  }

  store.write({
    name: "perry",
    params: {
      message: error.message,
      name: error.name,
      stack: error.stack,
    },
    property: "notify",
  });
};

export default notify;
