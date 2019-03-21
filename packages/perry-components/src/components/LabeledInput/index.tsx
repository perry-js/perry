import { FunctionalComponent, h } from "preact";

interface InputProps {
  label?: string;
  [a: string]: any;
}

const LabeledInput: FunctionalComponent<InputProps> = ({
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
