import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginBody {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
