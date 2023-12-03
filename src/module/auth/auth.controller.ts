import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { sessionConst } from './const/session.const';
import { AuthenticatedDto } from './dto/authenticated.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async authenticated(
    @Body() dto: AuthenticatedDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<HttpException> {
    const jwt = await this.authService.authenticatedUser(dto);
    console.log(
      '🚀 ~ file: auth.controller.ts:25 ~ AuthController ~ jwt:',
      jwt,
    );
    response.setCookie(sessionConst.session_name_cookie, jwt);
    return new HttpException('User authenticated', HttpStatus.OK);
  }
}
