import { FunctionalComponent, h } from "preact";

import LabeledInput from "@/components/LabeledInput";
import PerryReportInfo from "@/interfaces/PerryReportInfo";
import Box from "grid-styled/dist/Box";
import Button from "rebass/dist/Button";
import ButtonOutline from "rebass/dist/ButtonOutline";
import Divider from "rebass/dist/Divider";
import Modal from "rebass/dist/Modal";
import { Fixed } from "rebass/dist/Position";
import Subhead from "rebass/dist/Subhead";

interface ModalProps {
  form: PerryReportInfo;
  onSubmit: (reportInfo: PerryReportInfo) => void;
  onDiscard: () => void;
  onFieldChange: (property: string) => void;
}

const PreviewModal: FunctionalComponent<ModalProps> = ({
  form,
  onSubmit,
  onDiscard,
  onFieldChange,
}) => (
  <div>
    <Fixed
      top={0}
      right={0}
      bottom={0}
      left={0}
      onClick={onDiscard}
    />
    <Modal
      p={4}
      w={1 / 2}
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
          value={form.title}
          name="title"
          onChange={onFieldChange}
        />
        <LabeledInput
          label="Description"
          value={form.description}
          name="description"
          onChange={onFieldChange}
        />
      </Box>
      <Button
        mt={2}
        mr={2}
        onClick={onSubmit}
      >
        Submit
      </Button>
      <ButtonOutline
        mt={2}
        onClick={onDiscard}
      >
        Discard
      </ButtonOutline>
    </Modal>
  </div>
);

PreviewModal.defaultProps = {
  form: {},
  onSubmit: (_reportInfo) => {},
  onDiscard: () => {},
  onFieldChange: (_property) => {},
};

export default PreviewModal;
