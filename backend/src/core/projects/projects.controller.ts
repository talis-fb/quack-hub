import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProjectData, ProjectEntity } from './projects.entity';
import { ProjectsService } from './projects.service';
import { UserEntity } from '../user/user.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('')
  async create(@Body() body: ProjectData): Promise<ProjectEntity> {
    return await this.projectsService.create(body)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<ProjectData>,
  ) {
    return await this.projectsService.update(id, body)
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<ProjectEntity> {
    return await this.projectsService.getProjectById(id)
  }

  @Get(':id/users')
  async getUsers(@Param('id', ParseIntPipe) id: number): Promise<UserEntity[]> {
    return await this.projectsService.getUsersOfProject(id)
  }
}
