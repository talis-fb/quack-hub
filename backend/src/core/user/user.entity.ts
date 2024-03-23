import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsEmail,
  IsUrl,
  IsPhoneNumber,
  IsDate,
  IsOptional,
  MinLength,
  IsDateString,
  IsNumber,
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

  @IsDateString()
  @ApiProperty()
  birthday: Date;

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
