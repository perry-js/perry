import {
  IPerryReportInfo,
  IWidgetProps,
  WidgetStatus,
} from '@perry/perry-interfaces';
import { FunctionalComponent, h } from 'preact';
import { useCallback, useState } from 'preact/hooks';

import ControlledPreviewModal from '../ControlledPreviewModal';
import WidgetIcon from '../WidgetIcon';

import getLabelForState from '../../lib/get-label-for-widget-state';

export interface IWidgetState {
  isModalOpen: boolean;
  status: WidgetStatus;
}

const Widget: FunctionalComponent<IWidgetProps> = ({
  onSubmit,
  onStopRecording,
  onStartRecording,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(WidgetStatus.IDLE);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prevState) => !prevState);
  }, [setIsModalOpen]);

  const nextState = useCallback(async () => {
    switch (status) {
      case WidgetStatus.IDLE:
        await onStartRecording();
        return setStatus(WidgetStatus.RECORDING);
      case WidgetStatus.RECORDING:
        onStopRecording();
        return setStatus(WidgetStatus.STOPPED);
      case WidgetStatus.STOPPED:
        return toggleModal();
    }
  }, [onStartRecording, setStatus, toggleModal]);

  const handleSubmit = useCallback(
    (reportInfo: IPerryReportInfo) => {
      setStatus(WidgetStatus.IDLE);
      toggleModal();
      onSubmit(reportInfo);
    },
    [setStatus, toggleModal, onSubmit]
  );

  const handleDiscard = useCallback(() => {
    setStatus(WidgetStatus.IDLE);
    toggleModal();
  }, [toggleModal, setStatus]);

  return (
    <div>
      <button onClick={nextState}>
        <WidgetIcon status={status} />
        <p>{getLabelForState(status)}</p>
      </button>
      <ControlledPreviewModal
        open={isModalOpen}
        onSubmit={handleSubmit}
        onDiscard={handleDiscard}
      />
    </div>
  );
};

export default Widget;
