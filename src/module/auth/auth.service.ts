import { passwordSaltHelper } from '@/src/common/helpers/password-salt.helper';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthenticatedDto } from './dto/authenticated.dto';
import { JwtPayloadType } from './type/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async authenticatedUser(dto: AuthenticatedDto): Promise<string> {
    const find_user = await this.userService.findUserByQuery({
      username: dto.username,
    });

    if (!find_user) {
      throw new UnauthorizedException();
    }

    const compare_password =
      find_user.password === passwordSaltHelper(dto.password);

    if (!compare_password) {
      throw new UnauthorizedException();
    }
    const payload_jwt: JwtPayloadType = {
      id: find_user.id,
    };
    return await this.jwt.signAsync(payload_jwt);
  }

  async validate(
    token: string,
  ): Promise<[payload: boolean | never, user: UserEntity]> {
    console.log(
      '🚀 ~ file: auth.service.ts:43 ~ AuthService ~ validate ~ token:',
      token,
    );
    try {
      const decoded: any = this.jwt.decode(token);
      if (!decoded) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      const user: UserEntity = await this.validateUser(decoded);
      if (!user) {
        throw new UnauthorizedException();
      }
      return [true, user];
    } catch (err) {
      throw new HttpException(err.message.toUpperCase(), HttpStatus.FORBIDDEN);
    }
  }

  async validateUser(decoded: JwtPayloadType): Promise<UserEntity> {
    return this.userService.findUserByQuery({ id: decoded.id });
  }
}
