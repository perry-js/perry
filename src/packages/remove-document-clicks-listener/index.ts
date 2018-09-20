import defaultDocumentValuesStore from '@/packages/default-document-values-store';

export default function removeDocumentClicksListener(): void {
  document.onclick = defaultDocumentValuesStore.onclick;
}
