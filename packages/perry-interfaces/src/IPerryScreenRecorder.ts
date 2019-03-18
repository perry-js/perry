import BlobEvent from "./dom/BlobEvent";

export default interface IScreenRecorder {
  stop(): Promise<void>;
  start(): Promise<void>;
  onRecorderStopEvent(): void;
  onRecorderErrorEvent(error: BlobEvent): void;
  onRecorderDataAvailableEvent(event: BlobEvent): void;
}
