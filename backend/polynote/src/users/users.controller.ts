import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  Body,
  Res,
  HttpCode,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/models/validatedUser';
import { CreateUserBody } from './models/createUserBody';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  /** Get the profile metadata */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestUser) {
    return req.user;
  }

  /** Log out the user by deleting the httpOnly cookie */
  @HttpCode(200)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: FastifyReply) {
    res.setCookie('jwt', null, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
    });
  }

  /** Validate a user email */
  @Post('validate/:emailValidationId')
  async validateEmail(@Param('emailValidationId') emailValidationId) {
    await this.userService.validateEmail(emailValidationId);
    return {};
  }

  @Post('')
  async createUser(
    @Request() request: Request,
    @Body() createUser: CreateUserBody,
  ) {
    await this.userService.createUser(
      createUser.username,
      createUser.email,
      createUser.password,
    );
    return {};
  }
}
