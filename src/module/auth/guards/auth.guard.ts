import configuration from '@/src/config/configuration';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { sessionConst } from '../const/session.const';
import { AuthService } from '../auth.service';
import { serializePublicUserHelper } from '../../user/helpers/serialize-public-user.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const [payload, user] = await this.authService.validate(token);
    if (payload) {
      request['user'] = serializePublicUserHelper(user);
    }
    return payload;
  }

  private extractTokenFromHeader(
    request: FastifyRequest,
  ): string | undefined | null {
    const { valid, value } = request.unsignCookie(
      request.cookies?.[sessionConst.session_name_cookie] ?? '',
    );
    return valid ? value : undefined;
  }
}
