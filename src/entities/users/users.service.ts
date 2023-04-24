import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { ObjectId } from 'bson';

import { User, UserDocument } from 'src/schemas/user.schema';
import { CleanupDocuments } from 'src/decorators/cleanup-documents.decorator';
import { AuthorizedUser } from './users.model';

const PERSISTENT_JWT_TTL = '3d';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async getUserById(userId: string): Promise<User> {
    return await this.userModel.findOne({ _id: new ObjectId(userId) });
  }

  public async getUserByName(user: Partial<User>): Promise<User> {
    return this.userModel.findOne({ name: user.name.trim() }).exec();
  }

  @CleanupDocuments()
  public async getUsers(): Promise<User[]> {
    return await this.userModel.find().sort({ name: 1 });
  }

  public async createUser(user: Partial<User>): Promise<User> {
    const { name, password } = user;
    const passwordHash = await hash(password, 12);

    return this.userModel.create({
      name: name.trim(),
      password: passwordHash,
    });
  }

  public async updateUser(id: string, user: Partial<User>): Promise<void> {
    const { password, ...updatedUser } = user;

    if (password) {
      (<User>updatedUser).password = await hash(password, 12);
    }

    await this.userModel.updateOne({ _id: new ObjectId(id) }, updatedUser);
  }

  public async deleteUser({ id }: Partial<User>): Promise<void> {
    await this.userModel.deleteOne({
      _id: new ObjectId(id),
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
      access_token: `Bearer ${jwt}`,
      id: user.id,
      name: user.name,
    };
  }
}
