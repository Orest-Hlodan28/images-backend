import {
  Inject,
  Injectable
} from '@nestjs/common';
import { IImageService } from "./interfaces/IImageService";
import {
  IDemoServerService
} from "../demo-server/interfaces/IDemoServerService";
import {
  ServicesConst
} from "../shared/constants/services.const";
import { Image } from "./entities/image.entity";
import { Photo } from "./entities/photo.entity";
import { imageMapper } from "./mappers/PhotoMapper";

@Injectable()
export class ImagesService implements IImageService {

  constructor(@Inject(ServicesConst.DEMO_SERVER_SERVICE) private readonly demoServerService: IDemoServerService) {
  }

  async findAll() {
    const photos: Photo[] = await this.demoServerService.getPhotos<Photo>();

    const images: Image[] = await this.demoServerService.getImages<Image>();

    const mappedPhotos: Photo[] = images.map(photo => Object.fromEntries(Object.entries(photo).map(([key, value]) => [imageMapper[key], value])));

    return [...photos, ...mappedPhotos];
  }
}
