export const model = jest.fn().mockReturnValue({
  find: jest.fn(),
  findById: jest.fn().mockReturnValue('findById'),
  findOne: jest.fn().mockReturnValue('findOne'),
  updateOne: jest.fn().mockReturnValue('updateOne'),
  deleteOne: jest.fn().mockReturnValue('deleteOne'),
  deleteMany: jest.fn().mockReturnValue('deleteMany'),
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnValue([]),
  save: jest.fn().mockReturnValue('save'),
});

export const connection = {
  startSession: jest.fn().mockReturnValue({
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    endSession: jest.fn(),
  }),
};

export const logger = {
  log: jest.fn(),
  error: jest.fn(),
};
