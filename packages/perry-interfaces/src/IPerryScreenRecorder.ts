/// <reference types="@perry/types" />

export default interface IScreenRecorder {
  stop(): Promise<void>;
  start(): Promise<void>;
  onRecorderStopEvent(): void;
  onRecorderErrorEvent(error: MediaRecorderErrorEvent): void;
  onRecorderDataAvailableEvent(event: BlobEvent): void;
}
