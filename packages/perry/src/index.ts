/** Widget Component Props interface */
import { 
  IScreenRecorder as IPerryScreenRecorder,
  IPerryOptions,
  IPerryReportInfo,
} from '@perry/perry-interfaces';

/** Options validator, created with Yup. */
import isValidOptions from '@perry/is-valid-options';

/** Default options as a plain js object */
import defaultOptions from '@perry/default-options';

/** Clears perry store */
import clearStore from '@perry/clear-store';

/** Aggregates info and creates PerryReport */
import aggregateReport from '@perry/aggregate-report';

/** Toggles the feature switches to true so the listeners can start to watch */
import startListeners from '@perry/start-listeners';

/** Toggles the feature switches to false so the listeners stop watching */
import stopListeners from '@perry/stop-listeners';

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
      throw new Error("Your options are invalid. Please respect the options schema defined in the docs.");
    }

    if (this.options.clearOnReload) {
      clearStore();
    }
  }

  public start = async () => {
    try {
      await this.setupListeners();

      if (this.options.clearOnStart) {
        clearStore();
      }

      startListeners();

      if (this.options.enableScreenRecording) {
        await this.setupScreenRecorder();
        await this.screenRecorder.start();
      }
    } catch (e) {
      await this.stop();
      throw new Error("Failed to start recording. Stopped all listeners and recorders.");
    }
  }

  public stop = async () => {
    stopListeners();

    if (this.options.enableScreenRecording && this.screenRecorder) {
      await this.screenRecorder.stop();
    }
  }

  public submit = async (reportInfo: IPerryReportInfo = {}) => {
    const report = aggregateReport(reportInfo);

    this.options.plugins.map((plugin) => plugin(report));

    return report;
  }

  public notify = async (error: Error) => {
    const { default: notify } =
      await import(/* webpackChunkName: "perry-notify" */ "@perry/perry-notify");

    return notify(error);
  }

  public render = async () => {
    const { default: renderWidget } =
      await import(/* webpackChunkName: "perry-render-widget" */ "@perry/render-widget");

    return renderWidget({
      onStartRecording: this.start,
      onStopRecording: this.stop,
      onSubmit: this.submit,
    });
  }

  private setupListeners = async () => {
    if (this.hasListenersReady) {
      return;
    }

    const { default: setupListeners } =
      await import(/* webpackChunkName: "perry-setup-listeners" */ "@perry/setup-listeners");

    setupListeners(this.options);

    this.hasListenersReady = true;
  }

  private setupScreenRecorder = async () => {
    if (this.screenRecorder) {
      return;
    }

    const { default: ScreenRecorder } =
      await import(/* webpackChunkName: "perry-screen-recorder" */ "@perry/screen-recorder");

    this.screenRecorder = new ScreenRecorder({
      encodingType: "video/webm",
      videoName: "video",
    });
  }
}
