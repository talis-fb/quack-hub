import { NotFoundException } from "src/common/exceptions/collection/ResourceNotFound.exception";

export class UserNotFoundException extends NotFoundException {
  resourceName = "Usuário";
}