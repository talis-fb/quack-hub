import { PartialType, OmitType } from '@nestjs/swagger';
import { ProjectEntity } from '../project.entity';

export class UpdateProjectDto extends PartialType(OmitType(ProjectEntity, ["id"])) {}
