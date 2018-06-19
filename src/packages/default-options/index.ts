import PerryOptions from '../../interfaces/PerryOptions';

const defaultOptions: PerryOptions = {
  credentials: { /** empty credentials */ },
  clearOnReload: false,
  log: false,
  warn: true,
  error: true,
  cookies: false,
  localStorage: false,
  sessionStorage: false,
};

export default defaultOptions;
