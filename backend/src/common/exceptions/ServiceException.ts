import { HttpException, HttpStatus } from "@nestjs/common";

export abstract class ServiceException extends Error {
  abstract toHttp(): HttpException;
}


// Collections

export class NotFoundException extends ServiceException {
  toHttp(): HttpException {
    return new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
  }
}