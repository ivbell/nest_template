/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserEntity } from '@/src/module/user/entities/user.entity';
import { UserPublicType } from '@/src/module/user/type/user-public.type';

export const serializePublicUserHelper = (user: UserEntity): UserPublicType => {
  const { password, ..._user } = user;
  return _user;
};
