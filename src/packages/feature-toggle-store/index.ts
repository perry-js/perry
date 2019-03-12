import defaultFeatureToggleStore from "@/packages/default-feature-toggle-store";

const STORE = defaultFeatureToggleStore;

const read = (key: string) => STORE[key];

const set = (key: string, value: any) => STORE[key] = value;

export default {
  disable: (key: string): void => set(key, false),
  enable: (key: string): void => set(key, true),
  is: (key: string): boolean => read(key),
};
