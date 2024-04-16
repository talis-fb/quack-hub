export class RepositoryException extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Object.setPrototypeOf(this, RepositoryException.prototype);

    Error.captureStackTrace(this, RepositoryException);
  }
}
