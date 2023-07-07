import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TransAction {
  constructor(
    @InjectConnection() protected connection: Connection,
    protected logger: Logger,
  ) {}

  async transaction<T = unknown>(
    execute: (arg?: unknown) => T,
    callbackError: () => void,
  ): Promise<T> {
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
