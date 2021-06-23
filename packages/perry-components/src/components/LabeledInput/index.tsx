import { FunctionalComponent, h } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

export type LabeledInputProps =
  JSXInternal.HTMLAttributes<HTMLInputElement>;

const LabeledInput: FunctionalComponent<LabeledInputProps> = ({
  label,
  ...props
}) => (
  <div>
    <label>
      {label}
      <input {...props} />
    </label>
  </div>
);

export default LabeledInput;
