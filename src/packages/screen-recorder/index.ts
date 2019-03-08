import writeToStore from '@/packages/write-to-store';
import Features from '@/packages/features';
import FeatureToggleStore from '@/packages/feature-toggle-store';

export interface ScreenRecorderOptions {
  videoName: string;
  encodingType: string,
}

export class ScreenRecorder<T extends ScreenRecorderOptions> {
  private recorder;
  private stream;
  private data;
  private options: T;

  public constructor(options: T) {
    this.options = options;
  }

  public async start(): Promise<void> {
    if (!this.isEnabled() || !this.isBrowserCompatible()) {
      return;
    }

    const constraints = { video: { mediaSource: "screen" } };

    try {
      this.stream = await this.getDisplayMedia(constraints);
    } catch (err) {
      writeToStore({
        name: 'record',
        property: 'onerror',
        params: {
          message: 'an error occured while trying to access the screen',
          error: err,
        },
      });
      return;
    }

    // @ts-ignore
    this.recorder = new MediaRecorder(this.stream);
    this.data = [];

    this.recorder.ondataavailable = (evt) => this.data.push(evt.data);

    this.recorder.start();

    await new Promise((resolve, reject) => {
      this.recorder.onstop = () => {
        this.recorderOnstop();
        resolve();
      };
      this.recorder.onerror = reject;
    });
  }

  public stop() {
    if (!this.recorder) {
      return;
    }

    this.recorder.stop();
  }

  private recorderOnstop() {
    // create file to DL
    const node = document.createElement('a');
    node.setAttribute('id', 'video');
    node.innerText = this.options.videoName;

    const video = new Blob(this.data, { type: this.options.encodingType });
    const reader = new FileReader();
    reader.readAsDataURL(video);
    
    reader.onloadend = () => {
      const base64EncodedVideo = reader.result.toString();
      node.setAttribute('href', base64EncodedVideo);
      node.setAttribute('download', `${this.options.videoName}.webm`);
      document.getElementsByTagName('body')[0].appendChild(node);

      writeToStore({
        name: 'record',
        property: 'onfinish',
        params: {
          message: 'record is done',
          file: base64EncodedVideo,
        },
      });
    };
  }

  private getDisplayMedia(constraints): Promise<MediaStream> {
    // if IE `navigator.getDisplayMedia` needs to be used
    if (typeof navigator.getDisplayMedia === 'function') {
      return navigator.getDisplayMedia(constraints);
    }
    
    // @ts-ignore
    return navigator.mediaDevices.getDisplayMedia(constraints);
  }

  private isBrowserCompatible(): boolean {
    if (navigator && 'mediaDevices' in navigator) {
      // @ts-ignore
      if (typeof MediaRecorder === 'undefined') {
        writeToStore({
          name: 'record',
          property: 'onrecord',
          params: {
            message: 'MediaRecorder class seems unavailable in this browser',
          },
        });
    
        return false;
      }

      return true;
    }
    
    // write warning in store
    writeToStore({
      name: 'record',
      property: 'onrecord',
      params: {
        message: 'mediaDevices API seems unavailable in this browser',
      },
    });
    return false;
  }

  private isEnabled(): boolean {
    return FeatureToggleStore.is(Features.WINDOW_SCREEN_RECORD);
  }
}

export default function screenRecorder(options: ScreenRecorderOptions): ScreenRecorder<ScreenRecorderOptions> {
  return new ScreenRecorder(options);
}
