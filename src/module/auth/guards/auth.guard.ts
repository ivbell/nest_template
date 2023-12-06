import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { serializePublicUserHelper } from '../../user/helpers/serialize-public-user.helper';
import { AuthService } from '../auth.service';
import { sessionConst } from '../const/session.const';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      console.log(
        '🚀 ~ file: auth.guard.ts:20 ~ AuthGuard ~ canActivate ~ token:',
        token,
      );
      if (!token) {
        throw new UnauthorizedException();
      }
      const [payload, user] = await this.authService.validate(token);
      if (payload) {
        request['user'] = serializePublicUserHelper(user);
      }
      return payload;
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.guard.ts:29 ~ AuthGuard ~ canActivate ~ error:',
        error,
      );
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(
    request: FastifyRequest,
  ): string | undefined | null {
    try {
      const { valid, value } = request.unsignCookie(
        request.cookies?.[sessionConst.session_name_cookie] ?? '',
      );

      return valid ? value : undefined;
    } catch (error) {
      return undefined;
    }
  }
}
