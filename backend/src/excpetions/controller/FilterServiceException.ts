import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ServiceException } from '../service/ServiceException';
import { ServiceClientKnownRequestException } from '../service/ServiceClientKnownRequestException';
import { ServiceClientValidationException } from '../service/ServiceClientValidationException';
import { ServiceClientInitializationException } from '../service/ServiceClientInitializationException';

function verifyStatusCode(exception: ServiceException) {
  if (exception instanceof ServiceClientKnownRequestException) {
    return HttpStatus.BAD_REQUEST;
  } else if (exception instanceof ServiceClientValidationException) {
    return HttpStatus.UNPROCESSABLE_ENTITY;
  } else if (exception instanceof ServiceClientInitializationException) {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  } else {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

@Catch(ServiceException)
export class FilterServiceException implements ExceptionFilter {
  catch(exception: ServiceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = verifyStatusCode(exception);

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
