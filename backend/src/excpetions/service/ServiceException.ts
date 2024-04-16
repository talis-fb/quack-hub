export class ServiceException extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Object.setPrototypeOf(this, ServiceException.prototype);

    Error.captureStackTrace(this, ServiceException);
  }
}
