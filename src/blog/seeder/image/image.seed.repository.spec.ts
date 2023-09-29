import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { Article } from '../../../utils/schemas/blog/article.schema';
import { MainPage } from '../../../utils/schemas/blog/mainPage.schema';
import { Projects } from '../../../utils/schemas/blog/projects.schema';
import { ImageSeedRepository } from './image.seed.repository';

describe('ImageSeedRepository', () => {
  let imageSeedRepository: ImageSeedRepository;

  const model = jest.fn().mockReturnValue({
    find: jest.fn().mockReturnValue('find'),
  });

  const connection = {
    startSession: jest.fn().mockReturnValue({
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    }),
  };

  const logger = {
    log: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageSeedRepository,
        {
          provide: getConnectionToken('Database'),
          useValue: connection,
        },
        {
          provide: getModelToken(Article.name),
          useFactory: model,
        },
        {
          provide: getModelToken(MainPage.name),
          useFactory: model,
        },
        {
          provide: getModelToken(Projects.name),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    imageSeedRepository = module.get<ImageSeedRepository>(ImageSeedRepository);
  });

  it('check getData', async () => {
    expect(imageSeedRepository.getData).toBeDefined();

    expect(await imageSeedRepository.getData()).toStrictEqual({
      articles: 'find',
      mainPage: 'find',
      projects: 'find',
    });
  });
});
