import { OmitType, PartialType } from '@nestjs/swagger';
import { VacancyData } from '../vacancies.entity';

export class UpdateVacancyDto extends PartialType(
  OmitType(VacancyData, ['projectId']),
) {}
