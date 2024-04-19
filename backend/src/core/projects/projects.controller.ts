import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
  Query,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { ProjectData, ProjectEntity } from './projects.entity';
import { ProjectsService } from './projects.service';
import { UserEntity } from '../user/user.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('')
  async create(@Body() body: ProjectData): Promise<ProjectEntity> {
    return await this.projectsService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<ProjectData>,
  ) {
    return await this.projectsService.update(id, body);
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectEntity> {
    const resProject = await this.projectsService.getProjectById(id);
    if (!resProject) {
      throw new NotFoundException(`Project with ID ${id} not found!`);
    }
    return resProject;
  }

  @Get(':id/users')
  async getUsers(@Param('id', ParseIntPipe) id: number): Promise<UserEntity[]> {
    return await this.projectsService.getUsersOfProject(id);
  }

  @Get('')
  async searchProjects(@Query('q') query: string) {
    return await this.projectsService.search(query);
  } 

  @Delete(':id')
  async deleteProject(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectEntity> {
    return await this.projectsService.deleteProject(id);
  }
}
