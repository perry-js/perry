/** Widget Component Props interface */
import WidgetProps from "@/interfaces/WidgetProps";

/** Perry Options interface */
import PerryOptions from "@/interfaces/PerryOptions";

/** Perry Report Info interface */
import PerryReportInfo from "@/interfaces/PerryReportInfo";

/** Options validator, created with Yup. */
import isValidOptions from "@/packages/is-valid-options";

/** Default options as a plain js object */
import defaultOptions from "@/packages/default-options";

/** Clears perry store */
import clearStore from "@/packages/clear-store";

/** Aggregates info and creates PerryReport */
import aggregateReport from "@/packages/aggregate-report";

/** Renders the widget into document */
import renderWidget from "@/packages/render-widget";

/** Setup the listeners and proxies */
import setupListeners from "@/packages/setup-listeners";

/** Toggles the feature switches to true so the listeners can start to watch */
import startListeners from "@/packages/start-listeners";

/** Toggles the feature switches to false so the listeners stop watching */
import stopListeners from "@/packages/stop-listeners";

/** Perry stateless notifier */
import notify from "@/packages/perry-notify";

/** Screen recorder */
import ScreenRecorder from "@/packages/screen-recorder";

/** Perry.js class definition */
export default class Perry {
  public readonly notify = notify;
  private readonly options: PerryOptions;
  private readonly screenRecorder: ScreenRecorder;

  constructor(options: PerryOptions = defaultOptions) {
    this.options = {
      ...defaultOptions,
      ...options,
    };

    if (!isValidOptions(this.options)) {
      throw new Error("Your options are invalid. Please respect the options schema defined in the docs.");
    }

    if (this.options.enableScreenRecording) {
      this.screenRecorder = new ScreenRecorder({
        encodingType: "video/webm",
        videoName: "video",
      });
    }

    if (this.options.clearOnReload) {
      clearStore();
    }

    setupListeners(this.options);

    this.render();
  }

  public start = async () => {
    if (this.options.clearOnReload) {
      clearStore();
    }

    startListeners();

    if (this.options.enableScreenRecording) {
      await this.screenRecorder.start();
    }
  }

  public stop = async () => {
    stopListeners();

    if (this.options.enableScreenRecording) {
      await this.screenRecorder.stop();
    }
  }

  public submit = async (reportInfo: PerryReportInfo) => {
    const report = aggregateReport(reportInfo);

    this.options.plugins.map((plugin) => plugin(report));

    return report;
  }

  public render() {
    const props: WidgetProps = {
      onStartRecording: async () => {
        try {
          await this.start();
        } catch (e) {
          await this.stop();
          throw new Error("Failed to start recording. Stopped all listeners and recorders.");
        }
      },
      onStopRecording: this.stop,
      onSubmit: this.submit,
    };

    renderWidget(props);
  }
}
