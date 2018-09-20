import { h, Component } from "preact";
import Box from "grid-styled/dist/Box";
import Flex from "grid-styled/dist/Flex";
import Provider from "rebass/dist/Provider";
import WidgetIcon from "@/components/WidgetIcon";
import ControlledPreviewModal from '@/components/ControlledPreviewModal';
import WidgetStatus from "@/interfaces/WidgetStatus";
import WidgetProps from "@/interfaces/WidgetProps";
import getLabelForState from "@/packages/get-label-for-widget-state";
import PerryReportInfo from "@/interfaces/PerryReportInfo";

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
