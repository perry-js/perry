import PerryStoreEvent from '~/interfaces/PerryStoreEvent';

export default function writeToStore({
  name,
  property,
  params
}) {
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
