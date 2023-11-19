import { Test } from '@nestjs/testing';

import { RoomsRepository } from './repositories/rooms.repository';
import { RoomsService } from './rooms.service';

let roomsService: RoomsService;
const roomsRepository = jest.fn().mockReturnValue({
  getRoomsByInterlocutor: jest.fn().mockResolvedValue('getRoomsByInterlocutor'),
});
describe('RoomsService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: RoomsRepository,
          useFactory: roomsRepository,
        },
      ],
    }).compile();

    roomsService = module.get<RoomsService>(RoomsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('getRooms', async () => {
    const result = await roomsService.getRooms({ userId: 'userId' });

    expect(roomsService.getRooms).toBeDefined();
    expect(result).toBe('getRoomsByInterlocutor');
  });
});
