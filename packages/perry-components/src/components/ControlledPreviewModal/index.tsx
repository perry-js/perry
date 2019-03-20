import { IPerryReportInfo } from "@perry/perry-interfaces";
import { Component, h } from "preact";
import PreviewModal from "../PreviewModal";

interface IControlledPreviewModalProps {
  open: boolean;
  onSubmit?: (info: IPerryReportInfo) => void;
  onDiscard?: () => void;
}

export default class ControlledPreviewModal extends Component<IControlledPreviewModalProps, IPerryReportInfo> {
  public static defaultProps = {
    onDiscard: () => { /* noop */ },
    onSubmit: () => { /* noop */ },
    open: false,
  };

  public state = {
    description: "",
    screenshotUrl: "",
    title: "",
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
