/** Widget Component Props interface */
import WidgetProps from '@/interfaces/WidgetProps';

/** Perry Options interface */
import PerryOptions from '@/interfaces/PerryOptions';

/** Perry Report Info interface */
import PerryReportInfo from '@/interfaces/PerryReportInfo';

/** Options validator, created with Yup. */
import isValidOptions from '@/packages/is-valid-options';

/** Default options as a plain js object */
import defaultOptions from '@/packages/default-options';

/** Listens and stores interactions with the console */
import applyConsoleProxy from '@/packages/apply-console-proxy';

/** Listens and stores interactions with window.onerror */
import listenWindowErrors from '@/packages/listen-window-errors';

/** Listens and stores document clicks */
import listenDocumentClicks from '@/packages/listen-document-clicks';

/** Clears perry store */
import clearStore from '@/packages/clear-store';

/** Aggregates info and creates PerryReport */
import aggregateReport from '@/packages/aggregate-report';

/** Renders the widget into document */
import renderWidget from '@/packages/render-widget';

/** Perry.js class definition */
export default class Perry {
  private finalOptions: PerryOptions;

  constructor(options: object = {}) {
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
  }

  render() {
    const options = this.finalOptions;

    const props: WidgetProps = {
      onStartRecording: () => {
        // subscribe
        clearStore();
        applyConsoleProxy(options);
        listenWindowErrors(options);
        listenDocumentClicks(options);
      },
      onSubmit: (reportInfo: PerryReportInfo) => {
        const report = aggregateReport(reportInfo);

        options.plugins.map(plugin => plugin(report));

        return report;
      }
    };

    renderWidget(props);
  }
};
