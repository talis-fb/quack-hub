import { RepositoryException } from './RepositoryException';

export class RepositoryClientValidationException extends RepositoryException {
  constructor(message) {
    super(message);
  }
}
