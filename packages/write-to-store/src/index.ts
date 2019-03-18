import { StoreEvent as PerryStoreEvent } from '@perry/perry-interfaces';

export default function writeToStore({
  name,
  property,
  params
}): void {
  const key = `perry::${name}.${property}::history`;

  const history: ReadonlyArray<PerryStoreEvent> =
    JSON.parse(localStorage.getItem(key)) || [];

  const event: PerryStoreEvent = {
    params,
    timestamp: Date.now()
  };

  const newHistory: ReadonlyArray<PerryStoreEvent> = [
    ...history,
    event
  ];

  localStorage.setItem(key, JSON.stringify(newHistory));
}
