import IPerryOptions from "@/interfaces/IPerryOptions";
import FeatureToggleStore from "@/packages/feature-toggle-store";
import Features from "@/packages/features";
import mapHTMLElementToElementData from "@/packages/map-html-element-to-element-data";
import writeToStore from "@/packages/write-to-store";

export default function listenDocumentClicks(options: IPerryOptions): void {
  document.onclick = (event: MouseEvent) => {
    if (!FeatureToggleStore.is(Features.DOCUMENT_CLICK_LISTENER)) {
      return;
    }

    if (!options.clicks) {
      return;
    }

    const view: Window = event.view;
    const screen: Screen = view.screen;

    /** casting EventTarget type to HTMLElement type */
    const element: HTMLElement = event.target as HTMLElement;

    /** couldn't get view.visualViewport from Window type */
    const viewport: any = (view as any).visualViewport;

    writeToStore({
      name: "document",
      params: {
        event: {
          offsetX: event.offsetX,
          offsetY: event.offsetY,
          pageX: event.pageX,
          pageY: event.pageY,
          /** couldn't get event.path from MouseEvent type */
          path: (event as any).path.map(mapHTMLElementToElementData),
          screenX: event.screenX,
          screenY: event.screenY,
          type: event.type,
          x: event.x,
          y: event.y,
        },
        screen: {
          availHeight: screen.availHeight,
          availWidth: screen.availWidth,
          height: screen.height,
          orientation: screen.orientation.type,
          width: screen.width,
        },
        target: mapHTMLElementToElementData(element),
        viewport: {
          height: viewport.height,
          scale: viewport.scale,
          width: viewport.width,
        },
      },
      property: "onclick",
    });
  };
}
