import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class SkillDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  public proficiency: number;
}
