import { ServiceException } from './ServiceException';

export class ConflictException extends ServiceException {
  constructor(message) {
    super(message);
  }
}
