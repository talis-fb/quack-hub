import { ProjectData } from '../project.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateProjectDto extends OmitType(ProjectData, ['userId']) {}