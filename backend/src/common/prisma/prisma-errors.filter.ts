import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = MESSAGES[exception.code] || exception.message;

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}

const MESSAGES = {
  P2025: `Error of single constraint violation during search`,
  P2001: `An error of validation occurred during search`,
  P2002: 'Error in inicialization of Database!',
};
