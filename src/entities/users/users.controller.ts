import { compare } from 'bcrypt';

import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  ParseBoolPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CsrfGuard } from 'src/guards/csrf.guard';
import { AuthGuard } from 'src/guards/auth.guard';

import { UsersService } from './users.service';
import { AuthorizedUser, UserDto } from './users.model';
import { User } from 'src/schemas/user.schema';

@Controller('users')
@UseGuards(CsrfGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('signup')
  public async handleSignup(@Body() payload: UserDto): Promise<User> {
    const existentUser = await this.usersService.getUserByName(payload);

    if (existentUser) {
      throw new BadRequestException('User with such name already exists!');
    }

    return this.usersService.createUser(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async handleLogin(
    @Body() payload: UserDto,
    @Body('isPersistent', ParseBoolPipe) isPersistent: boolean,
  ): Promise<AuthorizedUser> {
    const user = await this.usersService.getUserByName(payload);

    const isCredentialsValid = user
      ? await compare(payload.password, user.password)
      : false;

    if (!isCredentialsValid) {
      throw new ForbiddenException(`Invalid credentials`);
    }

    return this.usersService.loginUser(user, isPersistent);
  }
}
