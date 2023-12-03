import { UserEntity } from '@/src/module/user/entities/user.entity';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto extends OmitType(UserEntity, [
  'created',
  'updated',
  'deletedAt',
  'id',
]) {
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password_confirm: string;
}
