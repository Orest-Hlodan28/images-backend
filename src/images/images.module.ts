import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { diImageService } from "../shared/diConfig";
import {
  DemoServerModule
} from "../demo-server/demo-server.module";

@Module({
  imports: [DemoServerModule],
  controllers: [ImagesController],
  providers: [diImageService]
})
export class ImagesModule {
}
