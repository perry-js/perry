/**
 * ## getDisplayMedia
 *
 * This methods returns the most reliable
 * way to use getDisplayMedia from the user"s browser
 *
 * @param constraints MediaStreamConstraints
 */
const getDisplayMedia = (
  constraints: object
): Promise<MediaStream> => {
  /**
   * If running on IE, then `navigator.getDisplayMedia`
   * should be used instead of `navigator.mediaDevices.getDisplayMedia`.
   */
  // @ts-ignore
  if (typeof navigator.getDisplayMedia === 'function') {
    // @ts-ignore
    return navigator.getDisplayMedia(constraints);
  }

  /**
   * TODO: Clean this `any` hack once getDisplayMedia
   * gets more stable.
   */
  const mediaDevices = navigator.mediaDevices as any;

  return mediaDevices.getDisplayMedia(constraints);
};

export default getDisplayMedia;
