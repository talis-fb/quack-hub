import { IsString } from 'class-validator';

export class ImportProjectsQueryDto {
  @IsString()
  username: string;

  @IsString()
  projectName: string;
}
