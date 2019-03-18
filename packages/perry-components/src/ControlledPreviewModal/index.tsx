import { h, Component } from "preact"
import PreviewModal from "../PreviewModal";
import { ReportInfo as PerryReportInfo} from "@perry/perry-interfaces";

interface ControlledPreviewModalProps {
  open: boolean;
  onSubmit?: (info: PerryReportInfo) => void;
  onDiscard?: () => void;
}

export default class ControlledPreviewModal extends Component<ControlledPreviewModalProps, PerryReportInfo> {
  state = {
    title: "",
    description: "",
    screenshotUrl: ""
  };

  static defaultProps = {
    open: false,
    onSubmit: () => {},
    onDiscard: () => {}
  };

  handleFieldChange = ({ target: { name, value }}: any) =>
    this.setState({ [name]: value });

  render() {
    const {
      open,
      onSubmit,
      onDiscard,
    } = this.props;

    return open && (
      <PreviewModal
        form={this.state}
        onSubmit={() => onSubmit(this.state)}
        onDiscard={onDiscard}
        onFieldChange={this.handleFieldChange}
      />
    );
  }
}