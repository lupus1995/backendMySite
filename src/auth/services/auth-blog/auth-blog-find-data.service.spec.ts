import { Test } from '@nestjs/testing';

import { UserBlogRepository } from 'auth/repositories/user-blog.repository';

import { AuthBlogFindDataService } from './auth-blog-find-data.service';

let authBlogFindDataServiceMock: AuthBlogFindDataService;

const userBlogRepositoryMock = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue('findOne'),
});

describe('AuthBlogFindDataService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthBlogFindDataService,
        {
          provide: UserBlogRepository,
          useFactory: userBlogRepositoryMock,
        },
      ],
    }).compile();

    authBlogFindDataServiceMock = module.get<AuthBlogFindDataService>(
      AuthBlogFindDataService,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('check uniqUsername', async () => {
    expect(authBlogFindDataServiceMock.uniqUsername).toBeDefined();
    expect(
      await authBlogFindDataServiceMock.uniqUsername({ username: 'username' }),
    ).toBe('findOne');
  });
});
