import { Feedback } from '../schemas/feedback.schema';
import { FeedbackDto } from './feedback.dto';

export const feedbackData: Feedback = {
  username: 'username',
  text: 'text',
};

export const feedbackDataSuccess: FeedbackDto = {
  ...feedbackData,
  falseField: '',
};

export const feedbackDataError: FeedbackDto = {
  ...feedbackData,
  falseField: 'sdfsdffsdf',
};
