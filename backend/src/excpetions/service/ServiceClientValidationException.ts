import { ServiceException } from './ServiceException';

export class ServiceClientValidationException extends ServiceException {
  constructor(message) {
    super(message);
  }
}
