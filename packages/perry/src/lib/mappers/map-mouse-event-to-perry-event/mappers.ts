import { IViewport } from "@perry/perry-interfaces";
import mapHTMLElementToElementData from "../map-html-element-to-element-data";

export const mapHTMLElementToSerializableTarget = (element: HTMLElement) =>
  mapHTMLElementToElementData(element);

export const mapMouseEventToSerializableMouseEvent = (event: MouseEvent) => ({
  offsetX: event.offsetX,
  offsetY: event.offsetY,
  pageX: event.pageX,
  pageY: event.pageY,
  path: (event as any).path.map(mapHTMLElementToElementData),
  screenX: event.screenX,
  screenY: event.screenY,
  type: event.type,
  x: event.x,
  y: event.y,
});

export const mapScreenToSerializableScreen = (screen: Screen) => ({
  availHeight: screen.availHeight,
  availWidth: screen.availWidth,
  height: screen.height,
  orientation: screen.orientation.type,
  width: screen.width,
});

export const mapViewportToSerializableViewport = (viewport: IViewport) => ({
  height: viewport.height,
  scale: viewport.scale,
  width: viewport.width,
});
