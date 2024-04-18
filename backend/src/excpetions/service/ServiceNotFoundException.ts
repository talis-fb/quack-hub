import { ServiceException } from './ServiceException';

export class ServiceNotFoundException extends ServiceException {
  constructor(message) {
    super(message);
  }
}
