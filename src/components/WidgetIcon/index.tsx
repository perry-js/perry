import { h, FunctionalComponent } from "preact"
import Base from "rebass/dist/Base"
import Circle from "rebass/dist/Circle"

import BugIcon from "@/components/BugIcon"
import WidgetStatus from "@/interfaces/WidgetStatus";

interface WidgetIconProps {
  status: WidgetStatus;
}

const RecordingIcon = Circle.extend`
  margin: 0;
  width: 24px;
  height: 24px;
  display: block;
  background-color: #f00;
`;

const StoppedIcon = Base.extend`
  width: 24px;
  height: 24px;
  display: block;
  background-color: #f00;
`;

const IconForStatus = {
  [WidgetStatus.IDLE]: BugIcon,
  [WidgetStatus.RECORDING]: RecordingIcon,
  [WidgetStatus.STOPPED]: StoppedIcon,
};

const WidgetIcon: FunctionalComponent<WidgetIconProps> = ({
  status
}) => {
  const IconComponent = IconForStatus[status];

  return (
    <Base mr="5px">
      <IconComponent />
    </Base>
  );
};

export default WidgetIcon
