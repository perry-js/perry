import FeatureToggleStore from '../feature-toggle-store';
import Features from '../features';

export default function stopListeners() {
  FeatureToggleStore.disable(Features.CONSOLE_LISTENER);
  FeatureToggleStore.disable(Features.WINDOW_ERROR_LISTENER);
  FeatureToggleStore.disable(Features.DOCUMENT_CLICK_LISTENER);
  FeatureToggleStore.disable(Features.NOTIFY_LISTENER);
}
