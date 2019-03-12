import IPerryOptions from "@/interfaces/IPerryOptions";
import PerryOptionsSchema from "@/packages/options-schema";

const isValidOptions = (options: IPerryOptions): boolean =>
  PerryOptionsSchema.isValidSync(options, { strict: true });

export default isValidOptions;
