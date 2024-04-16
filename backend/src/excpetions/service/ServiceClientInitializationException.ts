import { ServiceException } from './ServiceException';

export class ServiceClientInitializationException extends ServiceException {
  constructor(message) {
    super(message);
  }
}
