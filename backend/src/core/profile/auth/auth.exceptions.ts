import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceException } from 'src/common/exceptions/ServiceException';

export class EmailAlreadyInUseException extends ServiceException {
  toHttp(): HttpException {
    return new HttpException(
      'Usuário com esse e-mail já cadastrado.',
      HttpStatus.CONFLICT,
    );
  }
}
