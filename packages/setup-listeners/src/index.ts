import applyConsoleProxy from "@perry/apply-console-proxy";
import listenDocumentClicks from "@perry/listen-document-clicks";
import listenWindowErrors from "@perry/listen-window-errors";
import { IPerryOptions } from "@perry/perry-interfaces";

export default function setupListeners(options: IPerryOptions): void {
  applyConsoleProxy(options);
  listenWindowErrors(options);
  listenDocumentClicks(options);
}
