import moment from 'moment';
import firebase from './config';

interface MediaResponse {
  url: string;
  name: string;
  size: number;
  type: string;
}

interface UploadSingle {
  file: MediaResponse;
  progress: number;
}

const FirebaseStorage = {
  getPath(path: string) {
    return `${moment().format('YYYY')}/${path}/${moment().format('DD-MM')}`;
  },
  async upload(file: File | any, path = 'upload'): Promise<UploadSingle> {
    let progress: number = 0;
    const pathTo = this.getPath(path);

    const storageRef = firebase.storage().ref(`${pathTo}/${file.name}`);
    const data: MediaResponse = await storageRef.put(file).then(async (snapshot: any) => {
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      const metadata = await storageRef.getMetadata();
      const url = await storageRef.getDownloadURL();
      return { url, size: metadata.size, type: metadata.contentType, name: metadata.name };
    });
    return { file: data, progress };
  },
};

export default FirebaseStorage;
