import {Options as PerryOptions} from '@perry/perry-interfaces';
import writeToStore from '@perry/write-to-store';
import Features from '@perry/features';
import FeatureToggleStore from '@perry/feature-toggle-store';
import mapHTMLElementToElementData from '@perry/map-html-element-to-element-data';

export default function listenDocumentClicks(options: PerryOptions): void {
  document.onclick = function (event: MouseEvent) {
    if (!FeatureToggleStore.is(Features.DOCUMENT_CLICK_LISTENER)) {
      return;
    }

    const view: Window = event.view;
    const screen: Screen = view.screen;

    /** casting EventTarget type to HTMLElement type */
    const element: HTMLElement = event.target as HTMLElement;
    
    /** couldn't get view.visualViewport from Window type */
    const viewport: any = (view as any).visualViewport;
    
    options.clicks && writeToStore({
      name: 'document',
      property: 'onclick',
      params: {
        event: {
          type: event.type,
          x: event.x,
          y: event.y,
          screenX: event.screenX,
          screenY: event.screenY,
          pageX: event.pageX,
          pageY: event.pageY,
          offsetX: event.offsetX,
          offsetY: event.offsetY,
          /** couldn't get event.path from MouseEvent type */
          path: (event as any).path.map(mapHTMLElementToElementData)
        },
        target: mapHTMLElementToElementData(element),
        screen: {
          width: screen.width,
          availWidth: screen.availWidth,
          height: screen.height,
          availHeight: screen.availHeight,
          /** couldn't get screen.orientation from Screen type */
          orientation: (screen as any).orientation.type,
        },
        viewport: {
          scale: viewport.scale,
          width: viewport.width,
          height: viewport.height,
        }
      }
    });
  };
}
