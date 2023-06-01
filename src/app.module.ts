import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';
import { appConfig } from './config';
import { ImagesModule } from './images/images.module';
import {
  DemoServerModule
} from "./demo-server/demo-server.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
