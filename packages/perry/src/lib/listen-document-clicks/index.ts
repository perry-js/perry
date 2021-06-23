import { IPerryOptions, IPerryStore } from '@perry/perry-interfaces';
import FeatureToggleStore from '../feature-toggle-store';
import Features from '../features';
import mapMouseEventToPerryEvent from '../mappers/map-mouse-event-to-perry-event';

function listenDocumentClicks(
  options: IPerryOptions,
  store: IPerryStore
) {
  document.onclick = (event: MouseEvent) => {
    if (!FeatureToggleStore.is(Features.DOCUMENT_CLICK_LISTENER)) {
      return;
    }

    if (!options.clicks) {
      return;
    }

    store.write(mapMouseEventToPerryEvent(event));
  };
}

export default listenDocumentClicks;
