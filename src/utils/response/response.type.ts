import { ValidationError } from 'class-validator';

export interface IResponse<T = unknown> {
  data: T;
  status: number;
  errors: ValidationError[];
}
