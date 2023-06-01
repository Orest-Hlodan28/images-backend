import { ImagesService } from "../../images/images.service";
import { ServicesConst } from "../constants/services.const";
import {
  DemoServerService
} from "../../demo-server/demo-server.service";

export const diImageService = {
  provide: ServicesConst.IMAGE_SERVICE,
  useClass: ImagesService,
}

export const diDemoServerService = {
  provide: ServicesConst.DEMO_SERVER_SERVICE,
  useClass: DemoServerService,
}
