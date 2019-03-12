import IPerryOptions from "@/interfaces/IPerryOptions";
import applyConsoleProxy from "@/packages/apply-console-proxy";
import listenDocumentClicks from "@/packages/listen-document-clicks";
import listenWindowErrors from "@/packages/listen-window-errors";

export default function setupListeners(options: IPerryOptions): void {
  applyConsoleProxy(options);
  listenWindowErrors(options);
  listenDocumentClicks(options);
}
