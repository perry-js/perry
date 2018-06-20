import { h } from "preact"

import Modal from "rebass/dist/Modal"
import Heading from "rebass/dist/Heading"
import Box from "grid-styled/dist/Box"
import Base from "rebass/dist/Base"
import Close from "rebass/dist/Close"
import LabeledInput from "../LabeledInput"
import Button from "rebass/dist/Button"
import PerryReport from "@/interfaces/PerryReport"

interface ReportForm {
  title: string
  description: string
  screenshotUrl?: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  onDiscard: () => void
  form: ReportForm
  updateForm: (prop: string) => void
}

const Overlay = Base.extend`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
`

const StyledModal = Modal.extend`
  padding: 40px;
  width: 60%;
`

const PreviewModal = (props: ModalProps) =>
  props.isOpen && (
    <div>
      <StyledModal width={256}>
        <Box>
          <Close onClick={props.onClose} />
          <Heading fontSize={14}>Submit report</Heading>
          <LabeledInput
            label="Report title"
            value={props.form.title}
            onInput={props.updateForm("title")}
          />
          <LabeledInput
            label="Description or comments"
            value={props.form.title}
            onInput={props.updateForm("description")}
          />
        </Box>
        <Button onClick={props.onSubmit}>Submit</Button>
        <Button onClick={props.onDiscard}>Discard</Button>
      </StyledModal>
      <Overlay onClick={props.onClose} />
    </div>
  )

export default PreviewModal
