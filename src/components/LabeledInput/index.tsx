import Box from "grid-styled/dist/Box";
import { FunctionalComponent, h } from "preact";
import Input from "rebass/dist/Input";
import Label from "rebass/dist/Label";

interface InputProps {
  label?: string;
  [a: string]: any;
}

const LabeledInput: FunctionalComponent<InputProps> = ({
  label,
  ...props
}) => (
  <Box mb={3}>
    <Label>{label}</Label>
    <Input {...props} />
  </Box>
);

export default LabeledInput;
