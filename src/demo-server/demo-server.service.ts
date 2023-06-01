import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import {
  IDemoServerService
} from "./interfaces/IDemoServerService";
import { firstValueFrom } from "rxjs";

@Injectable()
export class DemoServerService implements IDemoServerService {

  constructor(private readonly httpService: HttpService, private readonly config: ConfigService) {
  }

  async getPhotos<T>(): Promise<T[]> {
    try {
      const { data: photos } =
        await firstValueFrom(
          this.httpService.get(`${this.config.get<string>('app.imageServerUrl')}/photos`)
        );

      const [extractedPhotos] = photos; // we do extraction because the data which come are array in array...

      return extractedPhotos;

    } catch (ex) {
      console.log('ex', ex)
      throw new BadRequestException('Failed to fetch data from the third-party server.');
    }
  }

  async getImages<T>(): Promise<T[]> {
    try {
      const { data: images } =
        await firstValueFrom(
          this.httpService.get(`${this.config.get<string>('app.imageServerUrl')}/images`)
        );

      const [extractedImages] = images; // we do extraction because the data which come are array in array...

      return extractedImages;

    } catch (ex) {
      console.log('ex', ex)
      throw new BadRequestException('Failed to fetch data from the third-party server.');
    }
  }
}
