import { HttpStatus, ValidationError } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ResponseService } from './response.service';

let responseService: ResponseService;
describe('ResponseService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ResponseService],
    }).compile();

    responseService = module.get<ResponseService>(ResponseService);
  });

  afterEach(() => jest.clearAllMocks());

  it('status BAD_REQUEST', () => {
    const result = responseService.prepareResponse({
      errors: [{} as ValidationError],
      data: null,
      isPost: false,
    });

    expect(result.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it('status CREATED', () => {
    const result = responseService.prepareResponse({
      errors: [],
      data: null,
      isPost: true,
    });

    expect(result.status).toBe(HttpStatus.CREATED);
  });
  it('status OK', () => {
    const result = responseService.prepareResponse({
      errors: [],
      data: null,
      isPost: false,
    });

    expect(result.status).toBe(HttpStatus.OK);
  });
  it('data is null', () => {
    const result = responseService.prepareResponse({
      errors: [{} as ValidationError],
      data: 123,
      isPost: false,
    });

    expect(result.data).toBeNull();
  });
  it('data is not null', () => {
    const result = responseService.prepareResponse({
      errors: [],
      data: 123,
      isPost: false,
    });

    expect(result.data).not.toBeNull();
  });
});
