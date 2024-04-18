export class ServiceException extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}
