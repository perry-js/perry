import { h } from "preact"
import Box from "grid-styled/dist/Box"
import Base from "rebass/dist/Base"
import Circle from "rebass/dist/Circle"

import BugIcon from "~/components/BugIcon"
import WidgetStatus from "~/interfaces/WidgetStatus";

interface WidgetIconProps {
  status: WidgetStatus
}

const RecordingIcon = Circle.extend`
  margin: 0;
  width: 24px;
  height: 24px;
  display: block;
  background-color: #f00;
`

const StoppedIcon = Base.extend`
  width: 24px;
  height: 24px;
  display: block;
  background-color: #f00;
`

const IconForStatus = {
  [WidgetStatus.IDLE]: BugIcon,
  [WidgetStatus.RECORDING]: RecordingIcon,
  [WidgetStatus.STOPPED]: StoppedIcon,
};

const WidgetIcon = (props: WidgetIconProps) => {
  const IconComponent = IconForStatus[props.status];

  return (
    <Base mr="5px">
      <IconComponent />
    </Base>
  );
};

export default WidgetIcon
