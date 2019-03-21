import { IPerryReportInfo } from "@perry/perry-interfaces";
import { FunctionalComponent, h } from "preact";
import LabeledInput from "../LabeledInput";

interface IModalProps {
  form: IPerryReportInfo;
  onSubmit: () => void;
  onDiscard: () => void;
  onFieldChange: (property: string) => void;
}

const PreviewModal: FunctionalComponent<IModalProps> = ({
  form,
  onSubmit,
  onDiscard,
  onFieldChange,
}) => (
  <div>
    <div>
      <h2>
        Submit report
      </h2>
      <hr />
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
    </div>
    <button
      onClick={onSubmit}
    >
      Submit
    </button>
    <button
      onClick={onDiscard}
    >
      Discard
    </button>
  </div>
);

PreviewModal.defaultProps = {
  form: {},
  onDiscard: () => { /* empty function */ },
  onFieldChange: () => { /* empty function */ },
  onSubmit: () => { /* empty function */ },
};

export default PreviewModal;
