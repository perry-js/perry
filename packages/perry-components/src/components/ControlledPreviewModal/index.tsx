import { IPerryReportInfo } from '@perry/perry-interfaces';
import { FunctionalComponent, h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { LabeledInputProps } from '../LabeledInput';
import PreviewModal from '../PreviewModal';
interface IControlledPreviewModalProps {
  open: boolean;
  onSubmit?: (info: IPerryReportInfo) => void;
  onDiscard?: () => void;
}

const noop = () => {};

const ControlledPreviewModal: FunctionalComponent<IControlledPreviewModalProps> =
  ({ open = false, onSubmit = noop, onDiscard = noop }) => {
    const [formState, setFormState] = useState<IPerryReportInfo>({
      description: '',
      screenshotUrl: '',
      title: '',
    });

    const handleFieldChange = useCallback<
      LabeledInputProps['onChange']
    >(
      (event) => {
        const { target } = event;

        /**
         * for some reason the type does not matches the implementation
         * so it triggers errors when trying to access well known properties
         * like `name` and `value` from `event.target`.
         */
        // @ts-ignore
        const { name, value } = target;

        setFormState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      },
      [setFormState]
    );

    return (
      open && (
        <PreviewModal
          form={formState}
          onSubmit={() => onSubmit(formState)}
          onDiscard={onDiscard}
          onFieldChange={handleFieldChange}
        />
      )
    );
  };

export default ControlledPreviewModal;
