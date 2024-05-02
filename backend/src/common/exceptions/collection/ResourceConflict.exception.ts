import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceException } from 'src/common/exceptions/ServiceException';

export class ConflictException extends ServiceException {
  public message: string | undefined;
  public resourceName: string = 'Recurso';

  toHttp(): HttpException {
    const message = this.message || `${this.resourceName} já existe`;
    return new HttpException(message, HttpStatus.NOT_FOUND);
  }
}
