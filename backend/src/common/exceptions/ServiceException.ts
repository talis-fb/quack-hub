import { HttpException, HttpStatus } from "@nestjs/common";

export abstract class ServiceException {
  abstract toHttp(): HttpException;
}
