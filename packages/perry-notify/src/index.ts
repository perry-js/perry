import writeToStore from '@perry/write-to-store';
import Features from '@perry/features';
import FeatureToggleStore from '@perry/feature-toggle-store';

const notify = (error: Error): void =>
  FeatureToggleStore.is(Features.NOTIFY_LISTENER) && writeToStore({
    name: 'perry',
    property: 'notify',
    params: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  });

export default notify;