import { IsOptional } from 'class-validator';

export class SearchAnnouncementQueryDto {
  @IsOptional()
  type?: string;

  @IsOptional()
  status?: string;
}
