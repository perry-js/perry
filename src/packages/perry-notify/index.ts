import FeatureToggleStore from "@/packages/feature-toggle-store";
import Features from "@/packages/features";
import writeToStore from "@/packages/write-to-store";

const notify = (error: Error): void => {
  if (!FeatureToggleStore.is(Features.NOTIFY_LISTENER)) {
    return;
  }

  writeToStore({
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
