import { IUserEntity } from '@/src/module/user/entities/user.entity';

export type UserPublicType = Omit<IUserEntity, 'password' | 'passwordUser'>;
