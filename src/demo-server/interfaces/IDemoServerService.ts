export interface IDemoServerService {
  getImages: <T>() => Promise<T[]> | never;
  getPhotos: <T>() => Promise<T[]> | never;
}
