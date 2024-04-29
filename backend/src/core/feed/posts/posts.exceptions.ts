import { NotFoundException } from 'src/common/exceptions/collection/ResourceNotFound.exception';

export class PostNotFoundException extends NotFoundException {
  resourceName = 'Post';
}
