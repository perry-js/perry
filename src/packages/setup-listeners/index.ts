import PerryOptions from "~/interfaces/PerryOptions";
import FeatureToggleStore from '~/packages/feature-toggle-store';
import applyConsoleProxy from "~/packages/apply-console-proxy";
import listenWindowErrors from "~/packages/listen-window-errors";
import listenDocumentClicks from "~/packages/listen-document-clicks";

export default function setupListeners(options: PerryOptions): void {
  applyConsoleProxy(options);
  listenWindowErrors(options);
  listenDocumentClicks(options);
}