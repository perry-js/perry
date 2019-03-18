import defaultFeatureToggleStore from '@perry/default-feature-toggle-store';

const STORE = defaultFeatureToggleStore;

const read = (key: string) => STORE[key];

const set = (key: string, value: any) => STORE[key] = value;

export default {
  is: (key: string): boolean => read(key),
  enable: (key: string): void => set(key, true),
  disable: (key: string): void => set(key, false),
};