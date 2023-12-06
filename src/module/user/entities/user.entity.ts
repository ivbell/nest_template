import { BaseEntity, IBaseEntity } from '@/src/common/entity/BaseEntity';
import { Column, Entity } from 'typeorm';
import { tags } from 'typia';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  username!: string;

  @Column({
    nullable: false,
  })
  password!: string;
}

export type IUserEntity = IBaseEntity & {
  username: string & tags.MinLength<3> & tags.Pattern<'^[a-zA-Z0-9]+$'>;
  password: string & tags.MinLength<8>;
};
