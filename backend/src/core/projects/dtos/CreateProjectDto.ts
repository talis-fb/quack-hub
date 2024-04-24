import { ProjectData } from '../projects.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateProjectDto extends OmitType(ProjectData, ['userId']) {}
