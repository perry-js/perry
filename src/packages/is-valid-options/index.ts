import PerryOptions from "@/interfaces/PerryOptions";
import PerryOptionsSchema from "@/packages/options-schema";

const isValidOptions = (options: PerryOptions): boolean =>
  PerryOptionsSchema.isValidSync(options, { strict: true });

export default isValidOptions;
