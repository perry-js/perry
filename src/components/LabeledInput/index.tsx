import { h } from "preact"
import Box from "grid-styled/dist/Box"
import Input from "rebass/dist/Input"
import Label from "rebass/dist/Label"

interface InputProps {
  label?: string
  [a: string]: any
}

const LabeledInput = (props: InputProps) => (
  <Box mb={3}>
    <Label>{props.label}</Label>
    <Input {...props} />
  </Box>
);

export default LabeledInput
