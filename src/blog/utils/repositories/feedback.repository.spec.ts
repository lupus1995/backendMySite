import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';

import { connection, model, logger } from '@utils/repositories/mockData';
import { Feedback } from '@utils/schemas/blog/feedback.schema';
import { MONGOOSE_LINK_NEST } from 'src/constants';

import { FeedbackRepository } from './feedback.repository';

describe('FeedbackRepository', () => {
  let feedbackRepository: FeedbackRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_NEST),
          useValue: connection,
        },
        {
          provide: getModelToken(Feedback.name, MONGOOSE_LINK_NEST),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    feedbackRepository = module.get<FeedbackRepository>(FeedbackRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create', () => {
    expect(feedbackRepository.create).toBeDefined();
  });

  it('findById', async () => {
    expect(await feedbackRepository.findById('id')).toBe('findById');
  });

  it('update', async () => {
    expect(
      await feedbackRepository.update({ id: 'id', data: {} as Feedback }),
    ).toBe('updateOne');
  });

  it('getAll', async () => {
    model().find.mockReturnThis();
    expect(
      await feedbackRepository.getAll({ offset: 0, limit: 10 }),
    ).toStrictEqual([]);
  });

  it('deleteMany', async () => {
    expect(await feedbackRepository.delete([])).toBe('deleteMany');
  });
});
