import { IPerryElementData } from '@perry/perry-interfaces';

const mapClassListToArray = (
  classList: DOMTokenList = {} as DOMTokenList
): ReadonlyArray<string> => [].slice.call(classList);

const mapHTMLElementToPerryElementData = (
  element: HTMLElement
): IPerryElementData => ({
  classList: mapClassListToArray(element.classList),
  className: element.className,
  dataset: element.dataset,
  disabled: (element as HTMLButtonElement).disabled,
  id: element.id,
  nodeName: element.nodeName,
  tagName: element.tagName,
  textContent: element.textContent,
});

export default mapHTMLElementToPerryElementData;
