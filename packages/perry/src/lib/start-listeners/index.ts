import FeatureToggleStore from '../feature-toggle-store';
import Features from '../features';

export default function startListeners() {
  FeatureToggleStore.enable(Features.CONSOLE_LISTENER);
  FeatureToggleStore.enable(Features.WINDOW_ERROR_LISTENER);
  FeatureToggleStore.enable(Features.DOCUMENT_CLICK_LISTENER);
  FeatureToggleStore.enable(Features.NOTIFY_LISTENER);
}
