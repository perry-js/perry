import OptionsSchema from '../options-schema';

export default options =>
  OptionsSchema.isValidSync(options, { strict: true });
