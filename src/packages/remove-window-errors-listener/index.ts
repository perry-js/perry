import defaultWindowValuesStore from '@/packages/default-window-values-store';

export default function removeWindowErrorsListener(): void {
  window.onerror = defaultWindowValuesStore.onerror;
}
