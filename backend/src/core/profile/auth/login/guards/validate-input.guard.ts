import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class ValidateInputForAuthLocal extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const body = plainToClass(SignInDto, request.body);

    const errors = await validate(body);

    const errorMessages = errors.flatMap(({ constraints }) =>
      Object.values(constraints),
    );

    if (errorMessages.length > 0) {
      response.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: errorMessages,
      });
    }

    return super.canActivate(context) as boolean | Promise<boolean>;
  }
}
