import FeatureToggleStore from "@/packages/feature-toggle-store";
import Features from "@/packages/features";
import writeToStore from "@/packages/write-to-store";

const notify = (error: Error): void =>
  FeatureToggleStore.is(Features.NOTIFY_LISTENER) && writeToStore({
    name: "perry",
    property: "notify",
    params: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });

export default notify;
