import { IsNotEmpty, IsString } from 'class-validator';

export class CvDto {
  @IsString()
  @IsNotEmpty()
  public downloadFilename: string;

  @IsString()
  @IsNotEmpty()
  public file: string;
}
