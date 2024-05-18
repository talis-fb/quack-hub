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
  Req,
} from '@nestjs/common';
import {
  InputProjectData,
  ProjectEntity,
} from 'src/core/projects/project/project.entity';
import { ProjectsService } from 'src/core/projects/project/project.service';
import { UserEntity } from 'src/core/profile/user/user.entity';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SearchProjectsQueryDto } from 'src/core/projects/project/dtos/SearchProjectsQueryDto';
import {
  ImportedProject,
  ProjectImporter,
} from 'src/core/projects/project/project-importer';
import { ImportProjectsQueryDto } from 'src/core/projects/project/dtos/ImportProjectQueryDto';
import { UserService } from 'src/core/profile/user/user.service';
import { SuggestProjects } from 'src/core/projects/project/suggest-projects';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UserService,
    private readonly projectImporter: ProjectImporter,
    private readonly suggestProjects: SuggestProjects,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created',
  })
  @Post('')
  async create(
    @Req() req,
    @Body() body: InputProjectData,
  ): Promise<ProjectEntity> {
    const { userId } = req.user;

    return await this.projectsService.create(body, userId);
  }

  @ApiResponse({
    status: 200,
    description: 'The project has been successfully updated',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: InputProjectData,
  ) {
    return await this.projectsService.update(id, body);
  }

  @Get('import')
  async importProject(
    @Query() importProjectQueryDto: ImportProjectsQueryDto,
  ): Promise<ImportedProject> {
    const { username, projectName } = importProjectQueryDto;

    return await this.projectImporter.importProject(username, projectName);
  }

  @ApiResponse({
    status: 200,
    description: 'Project filtered by id returned successfully.',
  })
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

  @ApiResponse({
    status: 200,
    description:
      'List of users participating in the project filtered by id returned successfully.',
  })
  @Get(':id/users')
  async getUsers(@Param('id', ParseIntPipe) id: number): Promise<UserEntity[]> {
    return await this.projectsService.getUsersOfProject(id);
  }

  @ApiResponse({
    status: 200,
    description: 'List of projects filtered by title returned successfully.',
  })
  @Get('')
  async searchProjects(@Req() req, @Query() query: SearchProjectsQueryDto) {
    const { title, userId, states } = query;

    const projects = await this.projectsService.search(title, userId, states);

    const user = await this.usersService.getUserById(req.user.userId);

    const output = await this.suggestProjects.suggest(user.methodologies, projects);
    
    return output;
  }

  @ApiResponse({
    status: 200,
    description: 'The project has been successfully removed',
  })
  @Delete(':id')
  async deleteProject(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectEntity> {
    return await this.projectsService.deleteProject(id);
  }
}
