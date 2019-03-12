import IPerryStoreEvent from "@/interfaces/IPerryStoreEvent";

export default function writeToStore({
  name,
  property,
  params,
}): void {
  const key = `perry::${name}.${property}::history`;

  const history: ReadonlyArray<IPerryStoreEvent> =
    JSON.parse(localStorage.getItem(key)) || [];

  const event: IPerryStoreEvent = {
    params,
    timestamp: Date.now(),
  };

  const newHistory: ReadonlyArray<IPerryStoreEvent> = [
    ...history,
    event,
  ];

  localStorage.setItem(key, JSON.stringify(newHistory));
}
