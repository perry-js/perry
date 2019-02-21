import Features from '~/packages/features';
import FeatureToggleStore from '~/packages/feature-toggle-store';

export default function stopListeners() {
  FeatureToggleStore.disable(Features.CONSOLE_LISTENER);
  FeatureToggleStore.disable(Features.WINDOW_ERROR_LISTENER);
  FeatureToggleStore.disable(Features.DOCUMENT_CLICK_LISTENER);
  FeatureToggleStore.disable(Features.NOTIFY_LISTENER);
}