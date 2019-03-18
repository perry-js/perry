import { h, Component } from "preact";
import Provider from "rebass/dist/Provider";
import WidgetIcon from "../WidgetIcon";
import ControlledPreviewModal from '../ControlledPreviewModal';
import {
  ReportInfo as PerryReportInfo,
  WidgetStatus,
  WidgetProps,
} from "@perry/perry-interfaces";
import getLabelForState from "@perry/get-label-for-widget-state";

import { StyledLabel, WidgetButton } from "./index.style";

export interface WidgetState {
  isModalOpen: boolean,
  status: WidgetStatus,
}

class Widget extends Component<WidgetProps, WidgetState> {
  state = {
    isModalOpen: false,
    status: WidgetStatus.IDLE,
  }

  toggleModal = () =>
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen
    }))

  setStatus = (status: WidgetStatus) =>
    this.setState({ status })

  nextStep = () => {
    switch (this.state.status) {
      case WidgetStatus.IDLE:
        this.props.onStartRecording();
        return this.setStatus(WidgetStatus.RECORDING)
      case WidgetStatus.RECORDING:
        this.props.onStopRecording();
        return this.setStatus(WidgetStatus.STOPPED)
      case WidgetStatus.STOPPED:
        return this.toggleModal()
    }
  }

  handleDiscard = () => {
    this.setStatus(WidgetStatus.IDLE)
    this.toggleModal()
  }

  handleSubmit = (reportInfo: PerryReportInfo) => {
    this.setStatus(WidgetStatus.IDLE)
    this.toggleModal()
    this.props.onSubmit(reportInfo)
  }

  render() {
    const { status, isModalOpen } = this.state;

    return (
      <Provider>
        <WidgetButton onClick={this.nextStep}>
          <WidgetIcon status={status} />
          <StyledLabel>{getLabelForState(status)}</StyledLabel>
        </WidgetButton>
        <ControlledPreviewModal
          open={isModalOpen}
          onSubmit={this.handleSubmit}
          onDiscard={this.handleDiscard}
        />
      </Provider>
    )
  }
}

export default Widget;
