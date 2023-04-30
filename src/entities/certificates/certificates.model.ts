import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

const currentYear = new Date().getFullYear();

export class CertificateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public issuerName: string;

  @IsString()
  @IsNotEmpty()
  public credentialUrl: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(2000)
  @Max(currentYear)
  public year: number;

  @IsString()
  @IsNotEmpty()
  public thumbnail: string;
}
