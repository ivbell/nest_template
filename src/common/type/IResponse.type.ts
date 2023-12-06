import { HttpStatus } from '@nestjs/common';

export interface IResponseType<T = undefined> {
  statusCode: HttpStatus;
  message?: string;
  data?: T;
}
