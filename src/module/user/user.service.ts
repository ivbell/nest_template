import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/src/module/user/entities/user.entity';
import { FindManyOptions, Repository, FindOptionsWhere } from 'typeorm';
import { passwordSaltHelper } from '@/src/common/helpers/password-salt.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepo.findOneBy({
      username: dto.username,
    });
    if (user) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }
    const confirm_password = dto.password === dto.password_confirm;
    if (!confirm_password) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_confirm, ...new_user } = dto;
    return this.userRepo.save({
      ...new_user,
      password: passwordSaltHelper(new_user.password),
    });
  }

  async findUserByQuery(
    where: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity> {
    return await this.userRepo.findOneBy(where);
  }

  async findUsersByQuery(
    options: FindManyOptions<UserEntity>,
  ): Promise<UserEntity[]> {
    return await this.userRepo.find(options);
  }
}
