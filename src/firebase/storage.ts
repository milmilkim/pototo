import { storage } from '../firebase/set';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  list,
  ListOptions,
} from 'firebase/storage';
import { v4 } from 'uuid';

const uploadFile = async (path: string, file: Blob, fileName: string) => {
  const somethingRef = ref(storage, `${path}/${fileName}`);
  const snapshot = await uploadBytes(somethingRef, file);

  return snapshot;
};

const getFileUrl = async (path: string) => {
  const url = await getDownloadURL(ref(storage, path));

  return url;
};

export const uploadImage = async (file: Blob | File) => {
  const fileName = v4();
  const filePath = 'images/' + fileName;
  await uploadFile('images/', file, fileName);
  return getFileUrl(filePath);
};

export const getImageList = async (
  path = '/images',
  _pageToken?: ListOptions['pageToken']
) => {
  const listRef = ref(storage, path);

  const currentPage = await list(listRef, {
    maxResults: 20,
    pageToken: _pageToken,
  });

  console.log(currentPage)
  const images = currentPage.items.map(
    (itemRef) =>
      'https://firebasestorage.googleapis.com/v0/b/image-test-storage.appspot.com/o/' +
      'images%2F' +
      itemRef.name +
      '?alt=media'
  );

//   const images = currentPage.items
  return { images, nextPageToken: currentPage.nextPageToken };
};
