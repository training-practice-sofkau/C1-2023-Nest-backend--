import { IsEmail, Matches, MinLength } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  email: string;

  @Matches(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
  @MinLength(8)
  password: string;
}
