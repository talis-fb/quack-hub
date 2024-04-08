import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    ParseIntPipe,
    Put,
    Query,
  } from '@nestjs/common';
  import { ProjectData, ProjectEntity } from './projects.entity';
  import _ from './projects.service';
  
  @Controller('projects')
  export class ProjectsController {
    constructor() {}
    @Post('')
    async create(@Body() body: ProjectData): ProjectEntity {
      // TODO
    }
    
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: ProjectData) {
      // TODO
    }

    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number) {
        // TODO
    }

    @Get(':id/users')
    async getUsers(@Param('id', ParseIntPipe) id: number) {
        // TODO
    }
  
  

  }
  