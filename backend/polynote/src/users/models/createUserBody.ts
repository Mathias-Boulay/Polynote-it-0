import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
