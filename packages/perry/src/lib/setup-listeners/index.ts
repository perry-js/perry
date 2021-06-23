import { IPerryOptions, IPerryStore } from '@perry/perry-interfaces';
import applyConsoleProxy from '../apply-console-proxy';
import listenDocumentClicks from '../listen-document-clicks';
import listenWindowErrors from '../listen-window-errors';

export default function setupListeners(
  options: IPerryOptions,
  store: IPerryStore
): void {
  applyConsoleProxy(options, store);
  listenWindowErrors(options, store);
  listenDocumentClicks(options, store);
}
