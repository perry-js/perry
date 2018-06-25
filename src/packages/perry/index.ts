/** Widget Component Props interface */
import WidgetProps from '@/interfaces/WidgetProps';

/** Perry Options interface */
import PerryOptions from '@/interfaces/PerryOptions';

/** Perry Report Info interface */
import PerryReportInfo from '@/interfaces/PerryReportInfo';

/** Options validator, created with Yup. */
import isValidOptions from '../is-valid-options';

/** Default options as a plain js object */
import defaultOptions from '../default-options';

/** Actual console[property] proxy */
import applyConsoleProxy from '../apply-console-proxy';

/** Listens and stores interactions in window.onerror */
import listenWindowErrors from '../listen-window-errors';

/** Listens and stores document clicks */
import listenDocumentClicks from '../listen-document-clicks';

/** Clears perry store */
import clearStore from '../clear-store';

/** Aggregates info and creates PerryReport */
import aggregateReport from '../aggregate-report';

/** Renders the widget into document */
import renderWidget from '../render-widget';

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
    
    applyConsoleProxy(options);
    listenWindowErrors(options);
    listenDocumentClicks(options);
  }

  render() {
    const options = this.finalOptions;

    const props: WidgetProps = {
      onSubmit: (reportInfo: PerryReportInfo) => {
        const report = aggregateReport(reportInfo);

        options.plugins.map(plugin => plugin(report));

        return report;
      }
    };

    renderWidget(props);
  }
};
