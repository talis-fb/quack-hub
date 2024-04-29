import { NotFoundException } from 'src/common/exceptions/collection/ResourceNotFound.exception';

export class CommentNotFoundException extends NotFoundException {
  resourceName = 'Comentário';
}
