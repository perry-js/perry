import { WidgetStatus } from '@perry/perry-interfaces';
import { FunctionalComponent, h } from 'preact';
import BugIcon from '../BugIcon';

interface IWidgetIconProps {
  status: WidgetStatus;
}

const IconForStatus = {
  [WidgetStatus.IDLE]: BugIcon,
  [WidgetStatus.RECORDING]: () => <p>RECORDING</p>,
  [WidgetStatus.STOPPED]: () => <p>STOPPED</p>,
};

const WidgetIcon: FunctionalComponent<IWidgetIconProps> = ({
  status,
}) => {
  const IconComponent = IconForStatus[status];

  return <IconComponent />;
};

export default WidgetIcon;
