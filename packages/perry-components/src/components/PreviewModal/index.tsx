import { IPerryReportInfo } from '@perry/perry-interfaces';
import { FunctionalComponent, h } from 'preact';
import LabeledInput, { LabeledInputProps } from '../LabeledInput';

interface IModalProps {
  form: IPerryReportInfo;
  onSubmit: () => void;
  onDiscard: () => void;
  onFieldChange: LabeledInputProps['onChange'];
}

const noop = () => {};

const PreviewModal: FunctionalComponent<IModalProps> = ({
  form = {},
  onSubmit = noop,
  onDiscard = noop,
  onFieldChange = noop,
}) => (
  <div>
    <div>
      <h2>Submit report</h2>
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
    <button onClick={onSubmit}>Submit</button>
    <button onClick={onDiscard}>Discard</button>
  </div>
);

export default PreviewModal;
