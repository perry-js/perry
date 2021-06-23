import { IPerryStore } from '@perry/perry-interfaces';

import clear from './lib/clear';
import write from './lib/write';

const PerryStore: IPerryStore = {
  clear,
  write,
};

export default PerryStore;
