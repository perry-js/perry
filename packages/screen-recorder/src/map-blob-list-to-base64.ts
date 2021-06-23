export interface IMapBlobListToBase64Params {
  blobList: Blob[];
  encodingType: string;
}

const mapBlobListToBase64 = ({
  blobList,
  encodingType,
}: IMapBlobListToBase64Params) =>
  new Promise((resolve, reject) => {
    const video = new Blob(blobList, { type: encodingType });
    const reader = new FileReader();
    reader.readAsDataURL(video);

    reader.addEventListener('error', reject);

    reader.addEventListener('loadend', () => {
      resolve(reader.result.toString());
    });
  });

export default mapBlobListToBase64;
