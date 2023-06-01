import { Photo } from "../entities/photo.entity";

export interface IImageService {
  findAll: () => Promise<Photo[]>;
}
