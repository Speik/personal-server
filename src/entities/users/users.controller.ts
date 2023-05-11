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
  Get,
  Patch,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';

import { Public } from 'src/decorators/pulic.decorator';
import { Throttle } from 'src/decorators/throttle.decorator';

import { UsersService } from './users.service';
import { AuthorizedUser, UserDto } from './users.model';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Throttle(1000)
  public handleGetUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post('signup')
  public async handleSignup(@Body() payload: UserDto): Promise<User> {
    const existentUser = await this.usersService.getUserByName(payload);

    if (existentUser) {
      throw new BadRequestException('User with such name already exists');
    }

    if (!payload.password) {
      throw new BadRequestException('Password is required');
    }

    return this.usersService.createUser(payload);
  }

  @Patch(':id')
  public async handleUserUpdate(
    @Param('id') id: string,
    @Body() payload: UserDto,
  ): Promise<void> {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userByName = await this.usersService.getUserByName({
      name: payload.name.trim(),
    });

    if (userByName && userByName.id !== user.id) {
      throw new BadRequestException('User with such name already exists');
    }

    return this.usersService.updateUser(id, payload);
  }

  @Delete(':id')
  public async handleUserDelete(@Param('id') id: string): Promise<void> {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersService.deleteUser(user);
  }

  @Public()
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
