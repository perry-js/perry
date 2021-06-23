declare interface BlobEvent {
  readonly data: Blob;
  readonly timecode: DOMHighResTimeStamp;
}

declare enum STATES {
  INACTIVE = "inactive",
  RECORDING = "recording",
  PAUSED = "paused",
}