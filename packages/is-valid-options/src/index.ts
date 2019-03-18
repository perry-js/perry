import PerryOptionsSchema from "@perry/options-schema";
import { IPerryOptions} from "@perry/perry-interfaces";

export default (options: IPerryOptions): boolean =>
  PerryOptionsSchema.isValidSync(options, { strict: true });
