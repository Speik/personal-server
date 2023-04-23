import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';
import { hash } from 'bcrypt';

import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthorizedUser } from './users.model';

const PERSISTENT_JWT_TTL = '3d';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async getUserByName(user: Partial<User>): Promise<User> {
    return this.userModel.findOne({ name: user.name.trim() }).exec();
  }

  public async createUser(user: Partial<User>): Promise<User> {
    const { name, password } = user;
    const passwordHash = await hash(password, 12);

    return this.userModel.create({
      name: name.trim(),
      password: passwordHash,
    });
  }

  public async loginUser(
    user: Partial<User>,
    isPersistent: boolean,
  ): Promise<AuthorizedUser> {
    const jwtEncodePayload = { id: user.id, name: user.name };
    const secret = this.configService.get<string>('JWT_SECRET');

    const ttl = isPersistent
      ? PERSISTENT_JWT_TTL
      : this.configService.get<string | number>('JWT_TTL');

    const jwt = await this.jwtService.signAsync(jwtEncodePayload, {
      secret,
      expiresIn: ttl,
    });

    return {
      access_token: jwt,
      id: user.id,
      name: user.name,
    };
  }
}
