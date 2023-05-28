import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';

export class TransAction {
  constructor(protected connection: Connection, protected logger: Logger) {}

  async transaction(
    execute: (arg?: unknown) => unknown,
    callbackError: () => void,
  ) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const result = await execute();
      await session.commitTransaction();
      return result;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      callbackError();
    } finally {
      session.endSession();
    }
  }
}
