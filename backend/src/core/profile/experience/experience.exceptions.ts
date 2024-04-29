import { HttpException, HttpStatus } from "@nestjs/common";
import { ServiceException } from "src/common/exceptions/ServiceException";

export class NotFoundExperienceException extends ServiceException {
    toHttp(): HttpException {
      return new HttpException('Experiência não encontrada', HttpStatus.NOT_FOUND);
    }
  }