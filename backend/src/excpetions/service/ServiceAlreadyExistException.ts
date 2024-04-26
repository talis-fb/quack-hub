import { ServiceException } from './ServiceException';

export class ServiceAlreadyExistException extends ServiceException {
  constructor(message) {
    super(message);
  }
}
