import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { FeedbackRepository } from './feedback.repository';
import { connection, model, logger } from './mockData';
import { Feedback } from '../../schemas/feedback.schema';

describe('FeedbackRepository', () => {
  let feedbackRepository: FeedbackRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackRepository,
        {
          provide: getConnectionToken('Database'),
          useValue: connection,
        },
        {
          provide: getModelToken(Feedback.name),
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
    // @ts-ignore
    model().find.mockReturnThis();
    expect(
      await feedbackRepository.getAll({ offset: 0, limit: 10 }),
    ).toStrictEqual([]);
  });

  it('deleteMany', async () => {
    expect(await feedbackRepository.delete([])).toBe('deleteMany');
  });
});
