import writeToStore from '../write-to-store';
import PerryOptions from '../../interfaces/PerryOptions';

export default function listenWindowErrors(options: PerryOptions): void {
  window.onerror = function (
    message: string,
    url: string,
    line: number,
    column: number,
    error: any,
  ) {
    options.error && writeToStore({
      name: 'window',
      property: 'onerror',
      params: {
        message,
        url,
        line,
        column,
        stack: error.stack,
      }
    });
  }
}
