import FeatureToggleStore from "@perry/feature-toggle-store";
import Features from "@perry/features";
import mapMouseEventToPerryEvent from "@perry/map-mouse-event-to-perry-event";
import { IPerryOptions } from "@perry/perry-interfaces";
import writeToStore from "@perry/write-to-store";

function listenDocumentClicks(options: IPerryOptions): void {
  document.onclick = (event: MouseEvent) => {
    if (!FeatureToggleStore.is(Features.DOCUMENT_CLICK_LISTENER)) {
      return;
    }

    if (!options.clicks) {
      return;
    }

    writeToStore(mapMouseEventToPerryEvent(event));
  };
}

export default listenDocumentClicks;
