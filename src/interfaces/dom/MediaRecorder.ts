/**
 * TODO: Remove this declarations once
 * dom.d.ts gets updated together with W3C Spec
 */
declare class MediaRecorder {
  constructor(stream: MediaStream);
  stop(): void;
  start(): void;
  addEventListener(event: string, handler: Function): void;
  removeEventListener(event: string, handler: Function): void;
}

export default MediaRecorder;