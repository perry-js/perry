import { IPerryOptions } from "@perry/perry-interfaces";
import applyConsoleProxy from "@perry/apply-console-proxy";
import listenWindowErrors from "@perry/listen-window-errors";
import listenDocumentClicks from "@perry/listen-document-clicks";

export default function setupListeners(options: IPerryOptions): void {
  applyConsoleProxy(options);
  listenWindowErrors(options);
  listenDocumentClicks(options);
}