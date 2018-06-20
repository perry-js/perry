import { h, Component } from "preact"
import Box from "grid-styled/dist/Box"
import Flex from "grid-styled/dist/Flex"
import Provider from "rebass/dist/Provider"
import styled from "styled-components"
import WidgetIcon from "../WidgetIcon"
import PreviewModal from "../PreviewModal"
import { StyledLabel, WidgetButton } from "./index.style"

export enum WidgetStatus {
  RECORDING,
  STOPPED,
  IDLE
}

export interface WidgetProps {
  status?: WidgetStatus
  credentials: object
  log: boolean
  warn: boolean
  error: boolean
  cookies: boolean
  localStorage: boolean
  sessionStorage: boolean
}

const getLabelForState = (state: WidgetStatus) => {
  switch (state) {
    case WidgetStatus.IDLE:
      return "Start recording"
    case WidgetStatus.RECORDING:
      return "Recording..."
    case WidgetStatus.STOPPED:
      return "Submit"
  }
}

class Widget extends Component {
  state = {
    isModalOpen: false,
    status: WidgetStatus.IDLE,
    form: {
      title: "",
      description: ""
    }
  }

  toggleModal = () =>
    this.setState({
      ...this.state,
      isModalOpen: !this.state.isModalOpen
    })

  setStatus = (status: WidgetStatus) =>
    this.setState({
      ...this.state,
      status
    })

  nextStep = () => {
    switch (this.state.status) {
      case WidgetStatus.IDLE:
        return this.setStatus(WidgetStatus.RECORDING)
      case WidgetStatus.RECORDING:
        return this.setStatus(WidgetStatus.STOPPED)
      case WidgetStatus.STOPPED:
        return this.toggleModal()
    }
  }

  discard = () => {
    this.setStatus(WidgetStatus.IDLE)
    this.toggleModal()
  }

  submit = () => {
    this.setStatus(WidgetStatus.IDLE)
    this.toggleModal()
  }

  updateForm = (key: string) => (val: any) => {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [key]: val }
    })
  }

  render() {
    return (
      <Provider>
        <WidgetButton onClick={this.nextStep}>
          <WidgetIcon status={this.state.status} />
          <StyledLabel>{getLabelForState(this.state.status)}</StyledLabel>
        </WidgetButton>
        <PreviewModal
          isOpen={this.state.isModalOpen}
          onClose={this.toggleModal}
          onSubmit={this.submit}
          onDiscard={this.discard}
          updateForm={this.updateForm}
          form={this.state.form}
        />
      </Provider>
    )
  }
}

export default Widget
