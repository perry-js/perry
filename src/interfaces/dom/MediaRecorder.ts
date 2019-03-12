import BlobEvent from "@/interfaces/dom/BlobEvent";

/**
 * TODO: Remove this declarations once
 * dom.d.ts gets updated together with W3C Spec
 */
declare class MediaRecorder {
  constructor(stream: MediaStream);
  public stop(): void;
  public start(): void;
  public addEventListener(event: string, handler: (event: BlobEvent) => void): void;
  public removeEventListener(event: string, handler: (event: BlobEvent) => void): void;
}

export default MediaRecorder;
