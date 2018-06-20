import { h } from "preact"
import BugIcon from "../BugIcon"
import { WidgetStatus } from "../Widget"
import Circle from "rebass/dist/Circle"
import Base from "rebass/dist/Base"

interface WidgetIconProps {
  status: WidgetStatus
}

const RecordingIcon = Circle.extend`
  background-color: #f00;
  margin: 0;
`
const StoppedIcon = Base.extend`
  width: 24px;
  height: 24px;
  display: block;
  background-color: #f00;
`

const IconContainer = Base.extend`
  margin-right: 5px;
`

const WidgetIcon = (props: WidgetIconProps) => {
  switch (props.status) {
    case WidgetStatus.IDLE:
      return (
        <IconContainer>
          <BugIcon />
        </IconContainer>
      )
    case WidgetStatus.RECORDING:
      return (
        <IconContainer>
          <RecordingIcon size={24} />
        </IconContainer>
      )
    case WidgetStatus.STOPPED:
      return (
        <IconContainer>
          <StoppedIcon />
        </IconContainer>
      )
  }
}

export default WidgetIcon
