import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService
} from "@nestjs/config";
import { diDemoServerService } from "../shared/diConfig";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
  ],
  providers: [diDemoServerService, ConfigService],
  exports: [diDemoServerService]
})
export class DemoServerModule {
}
