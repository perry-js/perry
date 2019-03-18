import { Options as PerryOptions} from '@perry/perry-interfaces';
import PerryOptionsSchema from '@perry/options-schema';

export default (options: PerryOptions): boolean =>
  PerryOptionsSchema.isValidSync(options, { strict: true });
