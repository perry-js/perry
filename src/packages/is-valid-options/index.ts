import PerryOptions from '~/interfaces/PerryOptions';
import PerryOptionsSchema from '~/packages/options-schema';

export default (options: PerryOptions): boolean =>
  PerryOptionsSchema.isValidSync(options, { strict: true });
