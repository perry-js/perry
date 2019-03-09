import writeToStore from '@/packages/write-to-store';

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

declare class BlobEvent {
  data: Blob;
}

export interface ScreenRecorderOptions {
  videoName: string;
  encodingType: string;
}

export default class ScreenRecorder<T extends ScreenRecorderOptions> {
  private options: T;
  private data: Array<Blob> = [];
  private stream: MediaStream;
  private recorder: MediaRecorder;

  public constructor(options: T) {
    this.options = options;
  }

  public async start(): Promise<void> {
    if (!this.isBrowserCompatible()) {
      return;
    }

    const constraints = { video: { mediaSource: 'screen' } };

    try {
      this.stream = await this.getDisplayMedia(constraints);
      this.setupMediaRecorder();
    } catch (error) {
      writeToStore({
        name: 'perryscreenrecorder',
        property: 'onerror',
        params: {
          error: error,
          message: 'An error occurred when trying to access DisplayMedia for Screen Recording.',
        },
      });

      throw error;
    }
  }

  private setupMediaRecorder() {
    this.data = [];
    this.recorder = new MediaRecorder(this.stream);

    this.recorder.addEventListener('stop', this.onRecorderStopEvent);
    this.recorder.addEventListener('error', this.onRecorderErrorEvent);
    this.recorder.addEventListener('dataavailable', this.onRecorderDataAvailableEvent);

    this.recorder.start();
  }

  onRecorderStopEvent = () => {
    this.recorderOnStop();
    this.stopStreamTracks();

    this.recorder.removeEventListener("stop", this.onRecorderStopEvent);
    this.recorder.removeEventListener("error", this.onRecorderErrorEvent);
    this.recorder.removeEventListener("dataavailable", this.onRecorderDataAvailableEvent);
  }

  onRecorderErrorEvent = (error: Error) => console.error(error);

  onRecorderDataAvailableEvent = (event: BlobEvent) => this.data.push(event.data);

  public stop() {
    if (!this.recorder) {
      return;
    }

    this.recorder.stop();
  }

  private stopStreamTracks() {
    this.stream.getTracks().forEach(track => track.stop());
  }

  private getStreamSettings() {
    const tracks = this.stream.getTracks();
    const settings = tracks.map(track => track.getSettings())[0];
    return settings;
  }

  private recorderOnStop() {
    const settings = this.getStreamSettings();
    const video = new Blob(this.data, { type: this.options.encodingType });
    const reader = new FileReader();
    reader.readAsDataURL(video);

    reader.addEventListener('loadend', () => {
      const base64EncodedVideo = reader.result.toString();

      writeToStore({
        name: 'perryscreenrecorder',
        property: 'onfinish',
        params: {
          message: 'Recording is done. File is a base64 encoded webm video.',
          file: base64EncodedVideo,
          settings: settings,
        },
      });

      /**
       * Clean up recording data from class instance.
       */
      this.data = [];
    });
  }

  private getDisplayMedia(constraints): Promise<MediaStream> {
    /**
     * If running on IE, then `navigator.getDisplayMedia`
     * should be used instead of `navigator.mediaDevices.getDisplayMedia`.
     */
    if (typeof navigator.getDisplayMedia === 'function') {
      return navigator.getDisplayMedia(constraints);
    }
    
    /**
     * TODO: Clean this `any` hack once getDisplayMedia
     * gets more stable.
     */
    const mediaDevices = (navigator.mediaDevices as any);

    return mediaDevices.getDisplayMedia(constraints);
  }

  private isBrowserCompatible(): boolean {
    if (navigator && 'mediaDevices' in navigator) {
      if (typeof MediaRecorder === 'undefined') {
        writeToStore({
          name: 'perryscreenrecorder',
          property: 'onrecord',
          params: {
            message: 'MediaRecorder Class seems unavailable in this browser.',
          },
        });
    
        return false;
      }

      return true;
    }
    
    writeToStore({
      name: 'perryscreenrecorder',
      property: 'onrecord',
      params: {
        message: 'MediaDevices API seems unavailable in this browser.',
      },
    });

    return false;
  }
}
