import applyConsoleProxy from './';

const options = {
  log: true,
  warn: true,
  error: true,
  clicks: true,
  cookies: true,
  localStorage: true,
  sessionStorage: true,
  clearOnReload: true,
  ignoreScriptErrors: true,
  plugins: []
}

describe('Apply Console Proxy', () => {
  it('should return undefined', () => {
    expect(applyConsoleProxy(options)).toBeUndefined();
  });
});
