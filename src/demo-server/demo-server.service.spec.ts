import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DemoServerService } from './demo-server.service';
import { AxiosError, AxiosResponse } from "axios";
import { of, throwError } from "rxjs";

describe('DemoServerService', () => {
  let demoServerService: DemoServerService;
  let httpServiceMock: jest.Mocked<HttpService>;
  let configServiceMock: Partial<ConfigService>;

  beforeEach(async () => {
    httpServiceMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpService>;
    configServiceMock = {
      get: jest.fn().mockReturnValue('http://demo.com'),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        DemoServerService,
        { provide: HttpService, useValue: httpServiceMock },
        {
          provide: ConfigService,
          useValue: configServiceMock
        },
      ],
    }).compile();

    demoServerService = moduleRef.get<DemoServerService>(DemoServerService);
  });

  describe('getPhotos', () => {
    it('should fetch and return photos', async () => {
      const photos = ['photo1', 'photo2'];

      jest.spyOn(httpServiceMock, 'get').mockReturnValue(
        of({
          data: [photos],
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        } as AxiosResponse<any>)
      );

      const result = await demoServerService.getPhotos<string>();

      expect(result).toEqual(photos);
      expect(httpServiceMock.get).toHaveBeenCalledWith('http://demo.com/photos');
    });

    it('should throw BadRequestException when fetching photos fails', async () => {
      const errorResponse = {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: 'Error message',
          headers: {},
          config: {},
        },
      } as AxiosError<any>;

      jest.spyOn(httpServiceMock, 'get').mockReturnValue(
        throwError(errorResponse)
      );

      await expect(demoServerService.getPhotos<string>()).rejects.toThrow(BadRequestException);
      expect(httpServiceMock.get).toHaveBeenCalledWith('http://demo.com/photos');
    });
  });

  describe('getImages', () => {
    it('should fetch and return images', async () => {
      const images = ['image1', 'image2'];

      jest.spyOn(httpServiceMock, 'get').mockReturnValue(
        of({
          data: [images],
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        } as AxiosResponse<any>)
      );

      const result = await demoServerService.getImages<string>();

      expect(result).toEqual(images);
      expect(httpServiceMock.get).toHaveBeenCalledWith('http://demo.com/images');
    });

    it('should throw BadRequestException when fetching images fails', async () => {
      const errorResponse = {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: 'Error message',
          headers: {},
          config: {},
        },
      } as AxiosError<any>;

      jest.spyOn(httpServiceMock, 'get').mockReturnValue(
        throwError(errorResponse)
      );

      await expect(demoServerService.getImages<string>()).rejects.toThrow(BadRequestException);
      expect(httpServiceMock.get).toHaveBeenCalledWith('http://demo.com/images');
    });
  });
});
