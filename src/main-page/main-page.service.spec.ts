import { Test, TestingModule } from '@nestjs/testing';
import { MainPageService } from './main-page.service';

describe('MainPageService', () => {
  let service: MainPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainPageService],
    }).compile();

    service = module.get<MainPageService>(MainPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
