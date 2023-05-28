import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from '../utils/tokens/token.guard';
import { AuthService } from '../auth/auth.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackDto } from './feedback.dto';
import { FeedbackService } from './feedback.service';
import {
  feedbackData,
  feedbackDataSuccess,
  feedbackDataError,
} from './mockData';

describe('feedback controller', () => {
  let controller: FeedbackController;
  const feedbackService = jest.fn().mockReturnValue({
    createFeedback: jest.fn(({ feedback }: { feedback: FeedbackDto }) => {
      if (feedback.falseField.length > 0) {
        return null;
      }

      return feedbackData;
    }),
    getFeedback: jest.fn().mockReturnValue([feedbackData]),
    deletedFeedback: jest.fn(),
  });

  const AuthGuardMock: CanActivate = {
    canActivate: jest.fn().mockReturnValue(false),
  };

  const authService = jest.fn().mockReturnValue(() => ({
    checkToken: jest.fn(() => {
      return true;
    }),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
          useFactory: feedbackService,
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: AuthService,
          useFactory: authService,
        },
      ],
    })
      .overrideProvider(AuthGuard)
      .useValue(AuthGuardMock)
      .compile();

    controller = module.get<FeedbackController>(FeedbackController);
  });

  afterEach(() => jest.clearAllMocks());

  it('create feedback success', async () => {
    const result = await controller.createFeedback(feedbackDataSuccess);

    expect(result).toStrictEqual(feedbackData);
  });

  it('create feedback error', async () => {
    const result = await controller.createFeedback(feedbackDataError);

    expect(result).toBe(null);
  });

  it('get feedback', async () => {
    const result = await controller.getFeedback({ offset: 0, limit: 10 });

    expect(result).toStrictEqual([feedbackData]);
  });
});
