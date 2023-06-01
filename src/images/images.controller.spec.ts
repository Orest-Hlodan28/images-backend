import { ImagesController } from './images.controller';
import { IImageService } from './interfaces/IImageService';
import { Image } from "./entities/image.entity";

describe('ImagesController', () => {
  let imagesController: ImagesController;
  let imageService: IImageService;

  beforeEach(() => {
    imageService = {
      findAll: jest.fn(),
    };
    imagesController = new ImagesController(imageService);
  });

  describe('findAll', () => {
    it('should call findAll method of imageService and return its result', async () => {
      const mockImages: Image[] = [
        { id: 1, albumId: 2, url: 'http://demo.com/url', thumbnailUrl: 'http://demo.com/url', title: "Example #1" },
        { id: 2, albumId: 2, url: 'http://demo.com/url', thumbnailUrl: 'http://demo.com/url', title: "Example #2" },
      ];
      // imageService.findAll.mockResolvedValue(mockImages);

      jest.spyOn(imageService, 'findAll').mockReturnValue(Promise.resolve(mockImages));

      const result = await imagesController.findAll();

      expect(imageService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockImages);
    });
  });
});
