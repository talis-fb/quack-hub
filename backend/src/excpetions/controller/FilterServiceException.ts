import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ServiceException } from '../service/ServiceException';
import { ServiceClientKnownRequestException } from '../service/ServiceClientKnownRequestException';

@Catch(ServiceException)
export class FilterServiceException implements ExceptionFilter {
  catch(exception: ServiceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof ServiceClientKnownRequestException) {
      const status = HttpStatus.BAD_REQUEST;
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    }
  }
}
