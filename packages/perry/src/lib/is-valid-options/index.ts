import { IPerryOptions} from "@perry/perry-interfaces";
import PerryOptionsSchema from "../options-schema";

export default (options: IPerryOptions): boolean =>
  PerryOptionsSchema.isValidSync(options, { strict: true });
