import { HttpStatus, Injectable, ValidationError } from '@nestjs/common';

import { IResponse } from './response.type';

@Injectable()
export class ResponseService {
  private setStastus({
    hasErrors,
    isPost,
  }: {
    hasErrors: boolean;
    isPost: boolean;
  }) {
    if (hasErrors) {
      return HttpStatus.BAD_REQUEST;
    }

    if (isPost) {
      return HttpStatus.CREATED;
    }

    return HttpStatus.OK;
  }

  prepareResponse<T>({
    errors,
    data,
    isPost = false,
  }: {
    errors: ValidationError[];
    data: T;
    isPost?: boolean;
  }): IResponse {
    const hasErrors = errors.length > 0;
    const status = this.setStastus({ hasErrors, isPost });

    if (hasErrors) {
      return {
        status,
        errors,
        data: null,
      };
    }

    return {
      status,
      errors: [],
      data,
    };
  }
}
