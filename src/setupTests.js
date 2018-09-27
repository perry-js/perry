/**
 * window.localStorage mock
 *
 * Exposes a localStorage mock to be used on redux thunk actions while
 * testing ConnectedComponents
 */
(function mockLocalStorage() {
  const localStorageMock = (() => {
    let store = {};

    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
}());