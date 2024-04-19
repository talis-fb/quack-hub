import { PartialType, OmitType } from '@nestjs/swagger';
import { ProjectEntity } from '../projects.entity';

export class UpdateProjectDto extends PartialType(OmitType(ProjectEntity, ["id"])) {}
