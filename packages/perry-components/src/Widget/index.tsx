import { h, Component } from "preact";
import Provider from "rebass/dist/Provider";
import WidgetIcon from "../WidgetIcon";
import ControlledPreviewModal from '../ControlledPreviewModal';
import {
  IPerryReportInfo,
  WidgetStatus,
  IWidgetProps,
} from "@perry/perry-interfaces";
import getLabelForState from "@perry/get-label-for-widget-state";

import { StyledLabel, WidgetButton } from "./index.style";

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
      <Provider>
        <WidgetButton onClick={this.next}>
          <WidgetIcon status={status} />
          <StyledLabel>{getLabelForState(status)}</StyledLabel>
        </WidgetButton>
        <ControlledPreviewModal
          open={isModalOpen}
          onSubmit={this.handleSubmit}
          onDiscard={this.handleDiscard}
        />
      </Provider>
    );
  }
}

export default Widget;