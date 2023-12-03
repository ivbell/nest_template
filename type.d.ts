// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fastify from 'fastify';
import { UserPublicType } from './src/module/user/type/user-public.type';

declare module 'fastify' {
  export interface FastifyRequest {
    user: UserPublicType;
  }
}
