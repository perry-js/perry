import { IPerryOptions } from '@perry/perry-interfaces';
import isValidOptions from '.';
import defaultOptions from '../default-options';

describe('is-valid-options', () => {
  it('accepts playground example', () => {
    function ConsoleLogPlugin(reportInfo) {
      console.log('[Perry Report Info]:', reportInfo);
    }

    const options: Partial<IPerryOptions> = {
      log: true,
      clicks: true,
      enableScreenRecording: true,
      plugins: [ConsoleLogPlugin],
    };

    const validate = () =>
      isValidOptions({
        ...defaultOptions,
        ...options,
      });

    expect(validate).not.toThrowError();
  });
});
