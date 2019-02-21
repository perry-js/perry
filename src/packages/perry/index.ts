/** Widget Component Props interface */
import WidgetProps from '~/interfaces/WidgetProps';

/** Perry Options interface */
import PerryOptions from '~/interfaces/PerryOptions';

/** Perry Report Info interface */
import PerryReportInfo from '~/interfaces/PerryReportInfo';

/** Options validator, created with Yup. */
import isValidOptions from '~/packages/is-valid-options';

/** Default options as a plain js object */
import defaultOptions from '~/packages/default-options';

/** Clears perry store */
import clearStore from '~/packages/clear-store';

/** Aggregates info and creates PerryReport */
import aggregateReport from '~/packages/aggregate-report';

/** Renders the widget into document */
import renderWidget from '~/packages/render-widget';

/** Setup the listeners and proxies */
import setupListeners from '~/packages/setup-listeners';

/** Toggles the feature switches to true so the listeners can start to watch */
import startListeners from '~/packages/start-listeners';

/** Toggles the feature switches to false so the listeners stop watching */
import stopListeners from '~/packages/stop-listeners';

/** Perry stateless notifier */
import notify from '~/packages/perry-notify';

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
