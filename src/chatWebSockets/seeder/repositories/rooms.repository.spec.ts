import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { connection, logger, model } from 'utils/repositories/mockData';
import { Rooms } from 'utils/schemas/web-sockets/rooms.schema';

import { RoomsRepository } from './rooms.repository';

let roomsRepository: RoomsRepository;

describe('RoomsRepository', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RoomsRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_SOCKETS),
          useValue: connection,
        },
        {
          provide: getModelToken(Rooms.name, MONGOOSE_LINK_SOCKETS),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    roomsRepository = module.get<RoomsRepository>(RoomsRepository);
  });

  afterEach(() => jest.clearAllMocks());

  it('createRoom', () => {
    expect(roomsRepository).toBeDefined();
  });
});
