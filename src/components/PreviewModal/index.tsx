import { h } from "preact"

import Modal from "rebass/dist/Modal"
import Subhead from "rebass/dist/Subhead"
import Divider from "rebass/dist/Divider"
import Box from "grid-styled/dist/Box"
import { Fixed } from "rebass/dist/Position"
import LabeledInput from "~/components/LabeledInput"
import Button from "rebass/dist/Button"
import ButtonOutline from "rebass/dist/ButtonOutline"
import PerryReportInfo from "~/interfaces/PerryReportInfo";

interface ModalProps {
  form: PerryReportInfo;
  onSubmit: (reportInfo: PerryReportInfo) => void;
  onDiscard: () => void;
  onFieldChange: (prop: string) => void;
}

const PreviewModal = (props: ModalProps) => (
  <div>
    <Fixed
      top={0}
      right={0}
      bottom={0}
      left={0}
      onClick={props.onDiscard}
    />
    <Modal
      p={4}
      w={1/2}
    >
      <Box>
        <Subhead>
          Submit report
        </Subhead>
        <Divider
          w={1}
          borderColor="blue"
        />
        <LabeledInput
          label="Report title"
          value={props.form.title}
          name="title"
          onChange={props.onFieldChange}
        />
        <LabeledInput
          label="Description"
          value={props.form.description}
          name="description"
          onChange={props.onFieldChange}
        />
      </Box>
      <Button
        mt={2}
        mr={2}
        onClick={props.onSubmit}
      >
        Submit
      </Button>
      <ButtonOutline
        mt={2}
        onClick={props.onDiscard}
      >
        Discard
      </ButtonOutline>
    </Modal>
  </div>
);

export default PreviewModal
