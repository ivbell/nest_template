import { BaseEntity } from '@/src/common/entity/BaseEntity';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Column({
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}

export type IUserEntity = UserEntity;
