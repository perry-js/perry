import PreviewModal from "@/components/PreviewModal";
import PerryReportInfo from "@/interfaces/PerryReportInfo";
import { Component, h } from "preact";

interface ControlledPreviewModalProps {
  open: boolean;
  onSubmit?: (info: PerryReportInfo) => void;
  onDiscard?: () => void;
}

export default class ControlledPreviewModal extends Component<ControlledPreviewModalProps, PerryReportInfo> {

  public static defaultProps = {
    open: false,
    onSubmit: () => {},
    onDiscard: () => {},
  };
  public state = {
    title: "",
    description: "",
    screenshotUrl: "",
  };

  public handleFieldChange = ({ target: { name, value }}: any) =>
    this.setState({ [name]: value })

  public render() {
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
