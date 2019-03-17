import IPerryOptions from "@/interfaces/IPerryOptions";
import FeatureToggleStore from "@/packages/feature-toggle-store";
import Features from "@/packages/features";
import mapMouseEventToPerryEvent from "@/packages/map-mouse-event-to-perry-event";
import writeToStore from "@/packages/write-to-store";

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
