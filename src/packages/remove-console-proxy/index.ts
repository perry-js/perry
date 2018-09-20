import defaultWindowValuesStore from '@/packages/default-window-values-store';

export default function removeConsoleProxy(): void {
  (window.console as any) = defaultWindowValuesStore.console;
}
