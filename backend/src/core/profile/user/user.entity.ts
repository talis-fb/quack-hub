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

  @IsString()
  @IsOptional()
  @ApiProperty()
  blog: string | null;
}

export class UserEntity extends UserData {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
