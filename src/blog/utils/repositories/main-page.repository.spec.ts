import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { MONGOOSE_LINK_NEST } from '../../../constants';
import { MainPageRepository } from './main-page.repository';
import {
  connection,
  logger,
  model,
} from '../../../utils/repositories/mockData';
import { CreateMainPageDto } from '../../main-page/main-page.dto';
import { MainPage } from '../../schemas/mainPage.schema';

describe('MainPageRepository', () => {
  let mainPageRepository: MainPageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainPageRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_NEST),
          useValue: connection,
        },
        {
          provide: getModelToken(MainPage.name, MONGOOSE_LINK_NEST),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    mainPageRepository = module.get<MainPageRepository>(MainPageRepository);
  });

  it('create', () => {
    expect(mainPageRepository.create).toBeDefined();
  });

  it('update', async () => {
    expect(
      await mainPageRepository.update({
        id: 'id',
        data: {} as CreateMainPageDto,
      }),
    ).toBe('updateOne');
  });

  it('findById', async () => {
    expect(await mainPageRepository.findById()).toBe('findOne');
  });

  it('getAll', () => {
    expect(() => {
      mainPageRepository.getAll({
        offset: 0,
        limit: 10,
        hasFilter: false,
      });
    }).toThrow('Method not implemented.');
  });

  it('delete', () => {
    expect(() => {
      mainPageRepository.delete([]);
    }).toThrow('Method not implemented.');
  });
});
