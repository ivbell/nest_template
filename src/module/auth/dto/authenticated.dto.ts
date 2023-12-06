import { tags } from 'typia';

export type AuthenticatedDto = {
  username: string;
  password: string & tags.MinLength<8>;
};
