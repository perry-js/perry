import { IViewport } from '@perry/perry-interfaces';
import { IPerryStoreWriteParams } from '@perry/perry-interfaces/build/IPerryStore';
import * as mappers from './mappers';

const mapMouseEventToPerryEvent = (
  event: MouseEvent
): IPerryStoreWriteParams => {
  const view: Window = event.view;
  const screen: Screen = view.screen;

  /** casting EventTarget type to HTMLElement type */
  const element = event.target as HTMLElement;

  /** couldn"t get view.visualViewport from Window type */
  const viewport = (view as any).visualViewport as IViewport;

  return {
    name: 'document',
    params: {
      event: mappers.mapMouseEventToSerializableMouseEvent(event),
      screen: mappers.mapScreenToSerializableScreen(screen),
      target: mappers.mapHTMLElementToSerializableTarget(element),
      viewport: mappers.mapViewportToSerializableViewport(viewport),
    },
    property: 'onclick',
  };
};

export default mapMouseEventToPerryEvent;
