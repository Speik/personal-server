import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(16)
  public text: string;
}
