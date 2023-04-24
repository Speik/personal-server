import { IsNotEmpty, IsString } from 'class-validator';

type AuthorizedUser = {
  access_token: string;
  id: string;
  name: string;
};

class UserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public password?: string;
}

export { UserDto, AuthorizedUser };
