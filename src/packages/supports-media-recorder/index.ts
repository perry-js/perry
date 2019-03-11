import MediaRecorder from '@/interfaces/dom/MediaRecorder';

const supportsMediaRecorder = () => typeof MediaRecorder !== 'undefined';

export default supportsMediaRecorder;