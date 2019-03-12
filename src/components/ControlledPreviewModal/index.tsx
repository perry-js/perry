import PreviewModal from "@/components/PreviewModal";
import IPerryReportInfo from "@/interfaces/IPerryReportInfo";
import { Component, h } from "preact";

interface IControlledPreviewModalProps {
  open: boolean;
  onSubmit?: (info: IPerryReportInfo) => void;
  onDiscard?: () => void;
}

export default class ControlledPreviewModal extends Component<IControlledPreviewModalProps, IPerryReportInfo> {

  public static defaultProps = {
    onDiscard: () => { /* empty function */ },
    onSubmit: () => { /* empty function */ },
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
