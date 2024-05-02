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
import { ProjectData, ProjectEntity } from './project.entity';
import { ProjectsService } from './project.service';
import { UserEntity } from 'src/core/profile/user/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateProjectDto } from './dtos/UpdateProjectDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dtos/CreateProjectDto';
import { SearchProjectsQueryDto } from './dtos/SearchProjectsQueryDto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created',
  })
  @Post('')
  async create(
    @Req() req,
    @Body() body: CreateProjectDto,
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
    @Body() body: UpdateProjectDto,
  ) {
    return await this.projectsService.update(id, body);
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
  async searchProjects(@Query() query: SearchProjectsQueryDto) {
    const { title, userId, states} = query;

    return await this.projectsService.search(title, userId, states);
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
