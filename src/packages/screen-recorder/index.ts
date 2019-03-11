import BlobEvent from '@/interfaces/dom/BlobEvent';
import MediaRecorder from '@/interfaces/dom/MediaRecorder';
import writeToStore from '@/packages/write-to-store';
import getDisplayMedia from '@/packages/get-display-media';
import mapBlobListToBase64 from '@/packages/map-blob-list-to-base64';
import supportsMediaDevices from '@/packages/supports-media-devices';
import supportsMediaRecorder from '@/packages/supports-media-recorder';

const STORE_CONFIGURATION = {
  name: 'perryscreenrecorder',
  properties: {
    onError: 'onerror',
    onStart: 'onstart',
    onFinish: 'onfinish',
  }
};

export interface ScreenRecorderOptions {
  videoName: string;
  encodingType: string;
}

export default class ScreenRecorder {
  private data: Array<Blob> = [];
  private stream: MediaStream;
  private recorder: MediaRecorder;
  private readonly options: ScreenRecorderOptions;

  public constructor(options: ScreenRecorderOptions) {
    this.options = options;
  }

  public async start(): Promise<void> {
    if (!this.isBrowserCompatible()) {
      return;
    }

    const constraints = { video: { mediaSource: 'screen' } };
  
    this.data = [];

    try {
      this.stream = await getDisplayMedia(constraints);
    } catch(e) {
      throw new Error("Failed to get DisplayMedia Stream.");
    }

    this.recorder = new MediaRecorder(this.stream);
  
    this.recorder.addEventListener('stop', this.onRecorderStopEvent);
    this.recorder.addEventListener('error', this.onRecorderErrorEvent);
    this.recorder.addEventListener('dataavailable', this.onRecorderDataAvailableEvent);
  
    this.recorder.start();
  }

  onRecorderStopEvent = () => {
    this.recorderOnStop();
    this.stopStreamTracks();

    this.recorder.removeEventListener('stop', this.onRecorderStopEvent);
    this.recorder.removeEventListener('error', this.onRecorderErrorEvent);
    this.recorder.removeEventListener('dataavailable', this.onRecorderDataAvailableEvent);
  }

  onRecorderErrorEvent = (error: Error) => console.error(error);

  onRecorderDataAvailableEvent = (event: BlobEvent) => this.data.push(event.data);

  public async stop(): Promise<void> {
    if (!this.recorder) {
      return;
    }

    await this.recorder.stop();
  }

  private stopStreamTracks(): void {
    this.stream.getTracks().forEach(track => track.stop());
  }

  private getStreamSettings(): MediaTrackSettings {
    const tracks = this.stream.getTracks();
    const settings = tracks.map(track => track.getSettings())[0];
    return settings;
  }

  private async recorderOnStop(): Promise<void> {
    const settings = this.getStreamSettings();

    const base64EncodedVideo = await mapBlobListToBase64({
      blobList: this.data,
      encodingType: this.options.encodingType,
    });

    writeToStore({
      name: STORE_CONFIGURATION.name,
      property: STORE_CONFIGURATION.properties.onFinish,
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
  }

  /**
   * TODO: Start logging browser information
   * to the store as well.
   */
  private isBrowserCompatible(): boolean {
    if (!supportsMediaRecorder()) {
      writeToStore({
        name: STORE_CONFIGURATION.name,
        property: STORE_CONFIGURATION.properties.onStart,
        params: {
          message: 'MediaRecorder Class seems unavailable in this browser.',
        },
      });
  
      return false;
    }

    if (!supportsMediaDevices()) {
      writeToStore({
        name: STORE_CONFIGURATION.name,
        property: STORE_CONFIGURATION.properties.onStart,
        params: {
          message: 'MediaDevices API seems unavailable in this browser.',
        },
      });
  
      return false;
    }

    return true;
  }
}