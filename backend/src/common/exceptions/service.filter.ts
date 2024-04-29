import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
} from '@nestjs/common';
    import { ServiceException } from 'src/common/exceptions/ServiceException';
    import { Response } from 'express';

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
    catch(exception: ServiceException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const httpException = exception.toHttp();

        response
        .status(httpException.getStatus())
        .json({
            statusCode: httpException.getStatus(),
            message: httpException.getResponse(),
        });
    }
}
  