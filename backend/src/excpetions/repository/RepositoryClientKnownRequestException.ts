import { RepositoryException } from './RepositoryException';

export class RepositoryClientKnownRequestException extends RepositoryException {
  constructor(message) {
    super(message);
  }
}
