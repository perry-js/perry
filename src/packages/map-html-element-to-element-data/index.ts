import PerryElementData from "@/interfaces/PerryElementData";

const mapClassListToArray =
  (classList: DOMTokenList = ({} as DOMTokenList)): ReadonlyArray<string> =>
    [].slice.call(classList);

const mapHTMLElementToPerryElementData = (element: HTMLElement): PerryElementData => ({
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
