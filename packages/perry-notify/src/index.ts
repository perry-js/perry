import writeToStore from '@perry/write-to-store';
import Features from '@perry/features';
import FeatureToggleStore from '@perry/feature-toggle-store';

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
