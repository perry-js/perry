/// <reference types="@perry/types" />

export default interface IScreenRecorder {
  stop: () => Promise<void>;
  start: () => Promise<void>;
  onRecorderStopEvent: EventListener;
  onRecorderErrorEvent: EventListener;
  onRecorderDataAvailableEvent: EventListener;
}
