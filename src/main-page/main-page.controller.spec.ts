import { Test, TestingModule } from '@nestjs/testing';
import { MainPageController } from './main-page.controller';

describe('MainPageController', () => {
  let controller: MainPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainPageController],
    }).compile();

    controller = module.get<MainPageController>(MainPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
