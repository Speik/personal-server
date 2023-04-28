import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class JourneyDto {
  @IsString()
  @IsNotEmpty()
  public employerName: string;

  @IsString()
  @IsNotEmpty()
  public jobTitle: string;

  @IsString()
  @IsNotEmpty()
  public shortDescription: string;

  @IsDateString()
  @IsNotEmpty()
  public startedAt: Date;

  @IsDateString()
  @IsOptional()
  public endedAt?: Nullable<Date>;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString({ each: true })
  public skills: string[];
}
