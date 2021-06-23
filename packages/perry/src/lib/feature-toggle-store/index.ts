import defaultFeatureToggleStore from '../default-feature-toggle-store';

const STORE = defaultFeatureToggleStore;

const read = (key: string) => STORE[key];

const set = (key: string, value: boolean) => (STORE[key] = value);

const FeatureToggleStore = {
  disable: (key: string) => {
    set(key, false);
  },
  enable: (key: string) => {
    set(key, true);
  },
  is: (key: string) => read(key),
};

export default FeatureToggleStore;
