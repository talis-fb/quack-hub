import { ServiceException } from './ServiceException';

export class ServiceConflictException extends ServiceException {
  constructor(message) {
    super(message);
  }
}
