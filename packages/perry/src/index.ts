/** Widget Component Props interface */
import { 
  WidgetProps,
  Options as PerryOptions,
  ReportInfo as PerryReportInfo,
} from '@perry/perry-interfaces';

/** Options validator, created with Yup. */
import isValidOptions from '@perry/is-valid-options';

/** Default options as a plain js object */
import defaultOptions from '@perry/default-options';

/** Clears perry store */
import clearStore from '@perry/clear-store';

/** Aggregates info and creates PerryReport */
import aggregateReport from '@perry/aggregate-report';

/** Renders the widget into document */
import renderWidget from '@perry/render-widget';

/** Setup the listeners and proxies */
import setupListeners from '@perry/setup-listeners';

/** Toggles the feature switches to true so the listeners can start to watch */
import startListeners from '@perry/start-listeners';

/** Toggles the feature switches to false so the listeners stop watching */
import stopListeners from '@perry/stop-listeners';

/** Perry stateless notifier */
import notify from '@perry/perry-notify';

/** Perry.js class definition */
export default class Perry {
  public notify = notify;
  private finalOptions: PerryOptions;

  constructor(options: PerryOptions = defaultOptions) {
    this.finalOptions = {
      ...defaultOptions,
      ...options,
    };

    if (!isValidOptions(this.finalOptions)) {
      throw new Error("Your options are invalid. Please respect the options schema defined in the docs.");
    }

    this.componentWillMount();
    this.render();
  }

  componentWillMount() {
    const options = this.finalOptions;
    options.clearOnReload && clearStore();
    setupListeners(options);
  }

  render() {
    const options = this.finalOptions;

    const props: WidgetProps = {
      onStartRecording: startListeners,
      onStopRecording: stopListeners,
      onSubmit: (reportInfo: PerryReportInfo) => {
        const report = aggregateReport(reportInfo);

        options.plugins.map(plugin => plugin(report));

        return report;
      }
    };

    renderWidget(props);
  }
};
