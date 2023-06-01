import { ImagesService } from './images.service';
import { IDemoServerService } from '../demo-server/interfaces/IDemoServerService';
import { Image } from './entities/image.entity';
import { of } from "rxjs";

describe('ImagesService', () => {
  let imagesService: ImagesService;
  let demoServerService: IDemoServerService;

  beforeEach(() => {
    demoServerService = {
      getPhotos: jest.fn(),
      getImages: jest.fn(),
    };
    imagesService = new ImagesService(demoServerService);
  });

  describe('findAll', () => {
    it('should return an array of photos and images', async () => {
      const mockPhotos: Image[] = [
        { id: 1, albumId: 1, url: 'http://demo.com/url', thumbnailUrl: 'http://demo.com/url', title: "Example #1" },
        { id: 2, albumId: 1, url: 'http://demo.com/url', thumbnailUrl: 'http://demo.com/url', title: "Example #2" },
      ];
      const mockImages: Image[] = [
        { id: 1, albumId: 2, url: 'http://demo.com/url', thumbnailUrl: 'http://demo.com/url', title: "Example #1" },
        { id: 2, albumId: 2, url: 'http://demo.com/url', thumbnailUrl: 'http://demo.com/url', title: "Example #2" },
      ];
      jest.spyOn(demoServerService, 'getPhotos').mockReturnValue(Promise.resolve(mockPhotos));
      jest.spyOn(demoServerService, 'getImages').mockReturnValue(Promise.resolve(mockImages));

      const result = await imagesService.findAll();

      expect(result).toEqual([...mockPhotos, ...mockImages]);
    });
  });
});
