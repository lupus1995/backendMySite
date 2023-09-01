import { Test } from '@nestjs/testing';
import { ImageSeedRepository } from './image.seed.repository';
import { ImageSeeder } from './images.seeder';
import { Logger } from '@nestjs/common';
import { ImageService } from '../../utils/image/image.service';

describe('ImagesSeeder', () => {
  let imageSeeder: ImageSeeder;

  const imageSeedRepository = jest.fn().mockReturnValue({
    getData: jest.fn().mockReturnValue({
      articles: [],
      projects: [],
      mainPage: [
        {
          firstBlockBackgroundImage: 'firstBlockBackgroundImage',
          aboutMePhoto: 'aboutMePhoto',
        },
      ],
    }),
  });

  const imageService = jest.fn().mockReturnValue({
    saveImageFromPath: jest.fn(),
    deletedFiles: jest.fn(),
  });

  const logger = jest.fn().mockReturnValue({
    log: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ImageSeeder,
        {
          provide: ImageSeedRepository,
          useFactory: imageSeedRepository,
        },
        {
          provide: ImageService,
          useFactory: imageService,
        },
        {
          provide: Logger,
          useFactory: logger,
        },
      ],
    }).compile();

    imageSeeder = module.get<ImageSeeder>(ImageSeeder);
  });

  it('seed', () => {
    expect(imageSeeder.seed).toBeDefined();
  });

  it('drop', () => {
    expect(imageSeeder.drop).toBeDefined();
  });
});
