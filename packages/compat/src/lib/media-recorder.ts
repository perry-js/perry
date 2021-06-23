/// <reference types="@perry/types" />
const supportsMediaRecorder = () =>
  typeof MediaRecorder !== 'undefined';

export default supportsMediaRecorder;
