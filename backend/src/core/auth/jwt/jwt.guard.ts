import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { isUsingPublicDecorator } from 'src/common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Ignore controller with `@Public()` decorator
    const isPublic = isUsingPublicDecorator(this.reflector, context);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
