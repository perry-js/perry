export default interface ElementData {
  id: string,
  dataset: object,
  tagName: string,
  className: string,
  classList: ReadonlyArray<string>,
  nodeName: string,
  textContent: string,
  disabled: boolean,
};
