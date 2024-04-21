import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/CreatePostDto';
import { UpdatePostDto } from './dtos/UpdatePostDto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    const output = await this.postsService.getPostById(id);

    return output;
  }

  @Get('/user/:userId')
  async getPostsByUserId(@Param('id', ParseIntPipe) userId: number) {
    const output = await this.postsService.getPostsByUserId(userId);

    return output;
  }

  @Post()
  async create(@Req() req, @Body() data: CreatePostDto) {
    const { userId } = req.user;

    const output = await this.postsService.create(data, userId);

    return output;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ) {
    const output = await this.postsService.update(id, data);

    return output;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const output = await this.postsService.delete(id);

    return output;
  }
}
