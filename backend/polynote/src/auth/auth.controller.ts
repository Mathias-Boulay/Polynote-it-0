import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginBody } from './models/loginBody';
import { RequestUser } from './models/validatedUser';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: RequestUser,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const result = await this.authService.login(req.user);

    // Then manually decode the jwt to get user meta data not present in the request
    const decodedToken = this.jwtService.decode(result.access_token, {
      json: true,
    });

    res.setCookie('jwt', result.access_token, {
      path: '/',
      httpOnly: true,
      // TODO make it nicer to read
      expires: new Date(Date.now() + 86400000),
    });

    return decodedToken;
  }
}
