import { PartialType, OmitType } from '@nestjs/swagger';
import { InputProjectData, ProjectEntity } from '../project.entity';

export class UpdateProjectDto extends PartialType(
  OmitType(InputProjectData, ['userId']),
) {}
