import IPerryOptions from "@/interfaces/IPerryOptions";
import IPerryReportInfo from "@/interfaces/IPerryReportInfo";
import IPerryScreenRecorder from "@/interfaces/IPerryScreenRecorder";

import aggregateReport from "@/packages/aggregate-report";
import clearStore from "@/packages/clear-store";
import defaultOptions from "@/packages/default-options";
import isValidOptions from "@/packages/is-valid-options";
import startListeners from "@/packages/start-listeners";
import stopListeners from "@/packages/stop-listeners";

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
      await import(/* webpackChunkName: "perry-notify" */ "@/packages/perry-notify");

    return notify(error);
  }

  public render = async () => {
    const { default: renderWidget } =
      await import(/* webpackChunkName: "perry-render-widget" */ "@/packages/render-widget");

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
      await import(/* webpackChunkName: "perry-setup-listeners" */ "@/packages/setup-listeners");

    setupListeners(this.options);

    this.hasListenersReady = true;
  }

  private setupScreenRecorder = async () => {
    if (this.screenRecorder) {
      return;
    }

    const { default: ScreenRecorder } =
      await import(/* webpackChunkName: "perry-screen-recorder" */ "@/packages/screen-recorder");

    this.screenRecorder = new ScreenRecorder({
      encodingType: "video/webm",
      videoName: "video",
    });
  }
}
