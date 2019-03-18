import { MediaRecorder } from "@perry/perry-interfaces";

const supportsMediaRecorder = () => typeof MediaRecorder !== "undefined";

export default supportsMediaRecorder;
