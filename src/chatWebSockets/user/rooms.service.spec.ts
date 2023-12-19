import { Test } from '@nestjs/testing';

import { RoomsRepository } from './repositories/rooms.repository';
import { RoomsService } from './rooms.service';

let roomsService: RoomsService;
const roomsRepository = jest.fn().mockReturnValue({
  getRoomsByInterlocutor: jest.fn().mockResolvedValue('getRoomsByInterlocutor'),
  getRoomById: jest.fn().mockResolvedValue('getRoomById'),
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

  it('getRoomById', async () => {
    const result = await roomsService.getRoomById({ roomId: '111' });

    expect(roomsService.getRoomById).toBeDefined();
    expect(result).toBe('getRoomById');
  });
});
