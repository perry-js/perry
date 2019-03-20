import {
  IPerryReportInfo,
  IWidgetProps,
  WidgetStatus,
} from "@perry/perry-interfaces";
import { Component, h } from "preact";
import ControlledPreviewModal from "../ControlledPreviewModal";
import WidgetIcon from "../WidgetIcon";

import getLabelForState from "../../lib/get-label-for-widget-state";

export interface IWidgetState {
  isModalOpen: boolean;
  status: WidgetStatus;
}

class Widget extends Component<IWidgetProps, IWidgetState> {
  public state = {
    isModalOpen: false,
    status: WidgetStatus.IDLE,
  };

  public toggleModal = () =>
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }))

  public setStatus = (status: WidgetStatus) =>
    this.setState({ status })

  public next = async () => {
    switch (this.state.status) {
      case WidgetStatus.IDLE:
        await this.props.onStartRecording();
        return this.setStatus(WidgetStatus.RECORDING);
      case WidgetStatus.RECORDING:
        this.props.onStopRecording();
        return this.setStatus(WidgetStatus.STOPPED);
      case WidgetStatus.STOPPED:
        return this.toggleModal();
    }
  }

  public handleDiscard = () => {
    this.setStatus(WidgetStatus.IDLE);
    this.toggleModal();
  }

  public handleSubmit = (reportInfo: IPerryReportInfo) => {
    this.setStatus(WidgetStatus.IDLE);
    this.toggleModal();
    this.props.onSubmit(reportInfo);
  }

  public render() {
    const { status, isModalOpen } = this.state;

    return (
      <div>
        <button onClick={this.next}>
          <WidgetIcon status={status} />
          <p>{getLabelForState(status)}</p>
        </button>
        <ControlledPreviewModal
          open={isModalOpen}
          onSubmit={this.handleSubmit}
          onDiscard={this.handleDiscard}
        />
      </div>
    );
  }
}

export default Widget;
