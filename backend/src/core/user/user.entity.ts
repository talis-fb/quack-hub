import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsEmail,
  IsUrl,
  IsDate,
  IsOptional,
  MinLength,
  IsNumberString,
  IsIn,
  ValidateNested,
} from 'class-validator';

export class UserData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  @ApiProperty()
  birthday: Date | null;

  // extra data
  @IsString()
  @IsOptional()
  @ApiProperty()
  bio: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  aboutDescription: string | null;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  avatarUrl: string | null;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  phone: string | null;
}

export class UserEntity extends UserData {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export const ExperienceTypeValues = [
  "PROFESSIONAL",
  "ACADEMIC",
] as const;

export type ExperienceType = typeof ExperienceTypeValues[number];

export class ExperienceData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string

  @IsString()
  @MinLength(3)
  @ApiProperty()
  about: string

  @IsDate()
  @ApiProperty()
  startDate: Date

  @IsDate()
  @IsOptional()
  @ApiProperty()
  endDate: Date | null

  @IsIn(ExperienceTypeValues)
  @ApiProperty()
  type: ExperienceType

  @ValidateNested()
  @ApiProperty()
  achievements: Array<AchievementData>
}

export class ExperienceEntity extends ExperienceData {
  @IsInt()
  id: number
}

export class AchievementData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string

  @IsString()
  @MinLength(3)
  @ApiProperty()
  description: string | null
}

export class AchievementEntity extends AchievementData {
  @IsInt()
  id: number
}
