import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ValidatedUser } from './models/validatedUser';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /** Check if a user is real */
  async validateUser(username: string, pass: string): Promise<ValidatedUser> {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException("Doesn't match any record");
    }

    if (await this.usersService.comparePassword(pass, user.password)) {
      if (!user.emailValidated) {
        throw new ForbiddenException('NON VALIDATED EMAIL');
      }

      return {
        _id: user._id.toString(),
        email: user.email,
        emailValidated: user.emailValidated,
      };
    }
    return null;
  }

  /** Create a new JWT token for the user */
  async login(user: ValidatedUser) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
