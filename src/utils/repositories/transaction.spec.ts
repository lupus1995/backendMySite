import { Logger } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { connection, logger } from './mockData';
import { TransAction } from './transaction';

describe('Transaction', () => {
  let transaction: TransAction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransAction,
        {
          provide: getConnectionToken('Database'),
          useValue: connection,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    transaction = module.get<TransAction>(TransAction);
  });

  it('transaction', () => {
    expect(transaction.transaction).toBeDefined();
  });
});
