import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  IsUUID,
} from 'class-validator';

export class UserData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsDateString()
  @ApiProperty()
  // @Transform(({ value }) => new Date(value))
  birthday: Date;

  // extra data
  @IsPhoneNumber()
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

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty()
  phone: string | null;
}

export class UserEntity extends UserData {
  @IsUUID()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
