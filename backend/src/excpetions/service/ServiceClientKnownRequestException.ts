import { ServiceException } from './ServiceException';

export class ServiceClientKnownRequestException extends ServiceException {
  constructor(message) {
    super(message);
  }
}
