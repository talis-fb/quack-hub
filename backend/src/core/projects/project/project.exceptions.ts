import { HttpException, HttpStatus } from "@nestjs/common";
import { ServiceException } from "src/common/exceptions/ServiceException";

export class NotFoundProjectException extends ServiceException {
    toHttp(): HttpException {
      return new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND);
    }
  }