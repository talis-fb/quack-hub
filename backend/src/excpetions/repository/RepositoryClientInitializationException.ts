import { RepositoryException } from './RepositoryException';

export class RepositoryClientInitializationException extends RepositoryException {
  constructor(message) {
    super(message);
  }
}
