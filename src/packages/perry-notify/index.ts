import writeToStore from '@/packages/write-to-store';
import Features from '@/packages/features';
import FeatureToggleStore from '@/packages/feature-toggle-store';

export default function notify(error: Error): void {
  if (!FeatureToggleStore.is(Features.NOTIFY_LISTENER)) {
    return;
  }

  return writeToStore({
    name: 'perry',
    property: 'notify',
    params: {
      name: error.name,
      message: error.message,
      stack: error && error.stack,
    }
  });
}