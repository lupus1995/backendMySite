import { BadRequestException, PipeTransform } from '@nestjs/common';
import { AuthPipe } from './auth.pipe';

describe('auth validation pipe', () => {
  const mockData = {
    password: '1234567890qwe',
    confirmPassword: '1234567890qwe',
    username: 'username',
  };
  let target: PipeTransform;

  beforeEach(() => {
    target = new AuthPipe();
  });

  it('check auth pipe', () => {
    const result = target.transform(mockData, { type: 'body' });
    expect(result).toBe(mockData);
  });

  it('check error auth pipe on type object', () => {
    const result = () => target.transform('sdfsdf', { type: 'body' });
    expect(result).toThrow('Invalid Request Body');
  });

  it('check error auth pipe on has field username in object', () => {
    const result = () =>
      target.transform(
        {
          password: '1234567890qwe',
          confirmPassword: '1234567890qwe',
        },
        { type: 'body' },
      );
    expect(result).toThrow('Invalid Request Body');
  });

  it('check error auth pipe on has field password in object', () => {
    const result = () =>
      target.transform(
        {
          confirmPassword: '1234567890qwe',
          username: 'username',
        },
        { type: 'body' },
      );
    expect(result).toThrow('Invalid Request Body');
  });

  it('check length password', () => {
    const result = () =>
      target.transform({ ...mockData, password: '4444' }, { type: 'body' });
    expect(result).toThrow(BadRequestException);
  });

  it('check confirm password', () => {
    const result = () =>
      target.transform(
        { ...mockData, password: '1234567890qwe1' },
        { type: 'body' },
      );
    expect(result).toThrow(BadRequestException);
  });
});
