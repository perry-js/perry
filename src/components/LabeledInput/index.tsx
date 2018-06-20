import { h } from "preact"
import Input from "rebass/dist/Input"
import Label from "rebass/dist/Label"

interface InputProps {
  label?: string
  [a: string]: any
}

export const LabeledInput = (props: InputProps) => (
  <div>
    <Label>{props.label}</Label>
    <Input {...props} />
  </div>
)

export default LabeledInput
