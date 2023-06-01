import {
  Controller,
  Get, Inject
} from '@nestjs/common';
import { IImageService } from "./interfaces/IImageService";
import {
  ServicesConst
} from "../shared/constants/services.const";

@Controller('images')
export class ImagesController {
  constructor(@Inject(ServicesConst.IMAGE_SERVICE) private readonly imagesService: IImageService) {
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

}
