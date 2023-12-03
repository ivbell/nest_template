import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticatedDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
