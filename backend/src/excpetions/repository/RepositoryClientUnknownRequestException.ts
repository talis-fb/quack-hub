import { RepositoryException } from './RepositoryException';

export class RepositoryClientUnknownRequestException extends RepositoryException {
  constructor(message) {
    super(message);
  }
}
