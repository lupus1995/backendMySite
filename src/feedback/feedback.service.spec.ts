import { Test } from '@nestjs/testing';
import { FeedbackRepository } from '../utils/repositories/feedback.repository';
import { FeedbackService } from './feedback.service';
import {
  feedbackData,
  feedbackDataSuccess,
  feedbackDataError,
} from './mockData';

describe('feedback service', () => {
  let feedbackService: FeedbackService;

  const feedbackRepositoryMock = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(feedbackData),
    getAll: jest.fn().mockReturnValue([feedbackData]),
    delete: jest.fn().mockReturnValue('delete'),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: FeedbackRepository,
          useFactory: feedbackRepositoryMock,
        },
      ],
    }).compile();

    feedbackService = await module.get(FeedbackService);
  });

  afterEach(() => jest.clearAllMocks());

  it('createFeedback success', async () => {
    const result = await feedbackService.createFeedback({
      feedback: feedbackDataSuccess,
    });

    expect(result).toStrictEqual(feedbackData);
  });

  it('createFeedback error', async () => {
    const result = await feedbackService.createFeedback({
      feedback: feedbackDataError,
    });

    expect(result).toBe(null);
  });

  it('get feedback', async () => {
    const result = await feedbackService.getFeedback({
      offset: 0,
      limit: 10,
    });

    expect(result).toStrictEqual([feedbackData]);
  });

  it('deletedFeedback', async () => {
    const result = await feedbackService.deletedFeedback({ ids: [] });

    expect(result).toBe('delete');
  });
});
