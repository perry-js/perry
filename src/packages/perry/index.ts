import IPerryOptions from "@/interfaces/IPerryOptions";
import IPerryReport from "@/interfaces/IPerryReport";
import IPerryReportInfo from "@/interfaces/IPerryReportInfo";
import IPerryScreenRecorder from "@/interfaces/IPerryScreenRecorder";

import aggregateReport from "@/packages/aggregate-report";
import clearStore from "@/packages/clear-store";
import defaultOptions from "@/packages/default-options";
import isValidOptions from "@/packages/is-valid-options";
import startListeners from "@/packages/start-listeners";
import stopListeners from "@/packages/stop-listeners";

import fetchNotify from "@/packages/perry-notify/async";
import fetchRenderWidget from "@/packages/render-widget/async";
import fetchScreenRecorder from "@/packages/screen-recorder/async";
import fetchSetupListeners from "@/packages/setup-listeners/async";

class Perry {
  /** @property {IPerryOptions} options Class instance Options provided by the User */
  private readonly options: IPerryOptions;

  /** @property {IPerryScreenRecorder} screenRecorder Screen Recorder Instance managed by Perry Instance */
  private screenRecorder?: IPerryScreenRecorder;

  /** @property {boolean} hasListenersReady Flag that indicates whether listeners are ready or not */
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

  /**
   * ## `perry.start()`
   *
   * This method starts a bug reporting session.
   * It invokes the `startListeners()` packages to
   * switch the listening toggle on.
   *
   * It also starts
   * the `ScreenRecorder` if `options.enableScreenRecording`
   * is setup as `true`.
   *
   * If something fails, it will stop all services
   * and throw an error
   *
   * @throws {Error}
   */
  public start = async () => {
    try {
      await this.prepare();

      startListeners();

      if (this.options.enableScreenRecording) {
        await this.screenRecorder.start();
      }
    } catch (error) {
      await this.stop();
      throw new Error("Failed to start recording. Stopped all listeners and recorders.");
    }
  }

  /**
   * ## `perry.stop()`
   *
   * Stops the current bug reporting session.
   * Invokes the `stopListeners()` package
   * to switch the listening toggle off.
   *
   * It also stops the `ScreenRecorder` if
   * it was enabled and instantiated.
   */
  public stop = async () => {
    stopListeners();

    if (this.options.enableScreenRecording && this.screenRecorder) {
      await this.screenRecorder.stop();
    }
  }

  /**
   * ## `perry.submit(reportInfo)`
   *
   * Submits the current stopped bug reporting session.
   *
   * Will iterate through all the `options.plugins` and invoke
   * all of them passing the aggregated perry report as an argument.
   *
   * If there is any function that returns a `Promise` in `options.plugins`,
   * it will await all of them to finish before actually resolving.
   *
   * @param {IPerryReportInfo} reportInfo
   * @returns {Promise<IPerryOptions>} `Promise<IPerryOptions>`
   */
  public submit = async (reportInfo: IPerryReportInfo = {}): Promise<IPerryReport> => {
    const report = aggregateReport(reportInfo);

    const executions =
      this.options.plugins.map((plugin) => plugin(report));

    await Promise.all(executions);

    return report;
  }

  /**
   * ## `perry.notify(error)`
   *
   * Injects a error programmatically into Perry Store.
   *
   * It is exposed to the user intentionally, so one is able to
   * log handled errors as well if needed.
   *
   * @param {Error} error
   * @returns {Promise<void>} `Promise<void>`
   */
  public notify = async (error: Error) => {
    const notify = await fetchNotify();
    return notify(error);
  }

  /**
   * ## `perry.render()`
   *
   * Renders the Perry Widget into the host page body element,
   * so one can start and submit bug reports using an interactive UI
   * injected in the application itself
   *
   * @returns {Promise<void>} `Promise<void>`
   */
  public render = async () => {
    const renderWidget = await fetchRenderWidget();
    return renderWidget({
      onStartRecording: this.start,
      onStopRecording: this.stop,
      onSubmit: this.submit,
    });
  }

  /**
   * ## `perry.prepare()`
   *
   * Runs some verification over the current instance
   * and setup the needed services as the options object state.
   *
   * It should be invoked only from `perry.start()`
   *
   * @returns {Promise<void>} `Promise<void>`
   */
  private prepare = async () => {
    if (this.options.clearOnStart) {
      clearStore();
    }

    if (!this.hasListenersReady) {
      const setupListeners = await fetchSetupListeners();
      setupListeners(this.options);
      this.hasListenersReady = true;
    }

    if (this.options.enableScreenRecording) {
      if (this.screenRecorder) { return; }

      const ScreenRecorder = await fetchScreenRecorder();

      this.screenRecorder = new ScreenRecorder({
        encodingType: "video/webm",
        videoName: "video",
      });
    }
  }
}

export default Perry;
