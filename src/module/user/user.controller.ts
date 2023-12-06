import { IResponseType } from '@/src/common/type/IResponse.type';
import { serializePublicUserHelper } from '@/src/module/user/helpers/serialize-public-user.helper';
import { UserPublicType } from '@/src/module/user/type/user-public.type';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Post()
  async create(
    @TypedBody() createUserDto: CreateUserDto,
  ): Promise<IResponseType<UserPublicType>> {
    return {
      statusCode: HttpStatus.OK,
      data: serializePublicUserHelper(
        await this.userService.create(createUserDto),
      ),
    };
  }

  @UseGuards(AuthGuard)
  @TypedRoute.Get('/profile')
  profile(@Req() req: FastifyRequest): IResponseType<UserPublicType> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
