import { IsString, IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(5)
  readonly password: string;
}
