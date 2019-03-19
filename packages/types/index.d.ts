declare interface BlobEvent {
  readonly data: Blob;
  readonly timecode: DOMHighResTimeStamp;
}

declare enum STATES {
  INACTIVE = "inactive",
  RECORDING = "recording",
  PAUSED = "paused",
}

// tslint:disable-next-line: interface-name
interface MediaRecorderErrorEvent extends Event {
  readonly error: DOMException;
}

declare var MediaRecorderErrorEvent: {
  prototype: MediaRecorderErrorEvent;
  new (): MediaRecorderErrorEvent;
};

// tslint:disable-next-line: interface-name
interface MediaRecorder {
  ignoreMutedMedia: boolean;
  readonly mimeType: string;
  readonly state: STATES;
  readonly stream: MediaStream;
  readonly videoBitsPerSecond: number;
  readonly audioBitsPerSecond: number;

  isTypeSupported(): boolean;
  pause(): void;
  requestData(): Blob;
  resume(): void;
  start(): void;
  stop(): void;

  ondataavailable(handler: (evt: BlobEvent) => void): void;
  onerror(handler: (err: MediaRecorderErrorEvent) => void): void;
  onpause(handler: () => void): void;
  onresume(handler: () => void): void;
  onstart(handler: () => void): void;
  onstop(handler: () => void): void;
}

declare var MediaRecorder: {
  prototype: MediaRecorder;
  new (stream: MediaStream): MediaRecorder;
};
