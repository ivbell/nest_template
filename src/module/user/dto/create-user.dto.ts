import { tags } from 'typia';
import { IUserEntity } from '../entities/user.entity';

export type CreateUserDto = Omit<
  IUserEntity,
  'created' | 'id' | 'updated' | 'deletedAt'
> & {
  password_confirm: string & tags.MinLength<8>;
};
