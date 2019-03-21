export interface IPerryStoreWriteParams {
  name: string;
  property: any;
  params: any;
}

export default interface IPerryStore {
  write: (data: IPerryStoreWriteParams) => void;
  clear: () => void;
}
