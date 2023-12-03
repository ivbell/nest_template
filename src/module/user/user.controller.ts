import { serializePublicUserHelper } from '@/src/module/user/helpers/serialize-public-user.helper';
import { UserPublicType } from '@/src/module/user/type/user-public.type';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserPublicType> {
    return serializePublicUserHelper(
      await this.userService.create(createUserDto),
    );
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  profile(@Req() req: FastifyRequest) {
    return req.user;
  }
}
