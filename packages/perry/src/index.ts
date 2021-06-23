import {
  IPerryOptions,
  IPerryReport,
  IPerryReportInfo,
  IPerryScreenRecorder,
} from '@perry/perry-interfaces';

import store from '@perry/store';

import aggregateReport from './lib/aggregate-report';
import defaultOptions from './lib/default-options';
import isValidOptions from './lib/is-valid-options';
import startListeners from './lib/start-listeners';
import stopListeners from './lib/stop-listeners';

export default class Perry {
  private readonly options: IPerryOptions;
  private screenRecorder?: IPerryScreenRecorder;
  private hasListenersReady: boolean = false;

  constructor(options: IPerryOptions = defaultOptions) {
    this.options = {
      ...defaultOptions,
      ...options,
    };

    if (!isValidOptions(this.options)) {
      throw new Error(
        'Your options are invalid. Please respect the options schema defined in the docs.'
      );
    }

    if (this.options.clearOnReload) {
      store.clear();
    }
  }

  public start = async () => {
    try {
      await this.setupListeners();

      if (this.options.clearOnStart) {
        store.clear();
      }

      startListeners();

      if (this.options.enableScreenRecording) {
        await this.setupScreenRecorder();
        await this.screenRecorder.start();
      }
    } catch (e) {
      await this.stop();
      throw new Error(
        'Failed to start recording. Stopped all listeners and recorders.'
      );
    }
  };

  public stop = async () => {
    stopListeners();

    if (this.options.enableScreenRecording && this.screenRecorder) {
      await this.screenRecorder.stop();
    }
  };

  public submit = async (
    reportInfo: IPerryReportInfo = {}
  ): Promise<IPerryReport> => {
    const report = aggregateReport(reportInfo);

    this.options.plugins.forEach((plugin) => plugin(report));

    return report;
  };

  public notify = async (error: Error) => {
    const { default: notify } = await import(
      /* webpackChunkName: "perry-notify" */ './lib/notify'
    );

    return notify(error, store);
  };

  public render = async () => {
    const { default: renderWidget } = await import(
      /* webpackChunkName: "perry-render-widget" */ '@perry/render-widget'
    );

    return renderWidget({
      onStartRecording: this.start,
      onStopRecording: this.stop,
      onSubmit: this.submit,
    });
  };

  private setupListeners = async () => {
    if (this.hasListenersReady) {
      return;
    }

    const { default: setupListeners } = await import(
      /* webpackChunkName: "perry-setup-listeners" */ './lib/setup-listeners'
    );

    setupListeners(this.options, store);

    this.hasListenersReady = true;
  };

  private setupScreenRecorder = async () => {
    if (this.screenRecorder) {
      return;
    }

    const { default: ScreenRecorder } = await import(
      /* webpackChunkName: "perry-screen-recorder" */ '@perry/screen-recorder'
    );

    this.screenRecorder = new ScreenRecorder(
      {
        encodingType: 'video/webm',
        videoName: 'video',
      },
      store
    );
  };
}
