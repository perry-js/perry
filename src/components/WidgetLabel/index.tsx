import { h } from "preact"
import Text from "rebass/dist/Text"
import { WidgetState, WidgetButton } from "@/components/Widget"

interface WidgetLabelProps {
  state: WidgetState
}

const getLabelForState = (state: WidgetState) => {
  switch (state) {
    case WidgetState.IDLE:
      return "Start recording"

    case WidgetState.RECORDING:
      return "Recording..."

    case WidgetState.STOPPED:
      return "Submit"
  }
}

const Label = Text.extend`
  color: #444;
  opacity: 0;
  transition: all 0.4s;
  white-space: nowrap;
  margin-bottom: 3px;
  margin-right: 3px;

  ${WidgetButton}:hover & {
    opacity: 1;
  }
`

const WidgetLabel = (props: WidgetLabelProps) => <Label>{getLabelForState(props.state)}</Label>

export default WidgetLabel
