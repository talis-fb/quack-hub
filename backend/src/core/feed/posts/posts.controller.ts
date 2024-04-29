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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: 200,
    description: 'Post filtered by id returned successfully.',
  })
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const output = await this.postsService.getPostById(id);

    return output;
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of post by user id.',
  })
  @Get('/user/:userId')
  async findManyByUserId(@Param('userId', ParseIntPipe) userId: number) {
    const output = await this.postsService.getPostsByUserId(userId);

    return output;
  }

  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created',
  })
  @Post()
  async create(@Req() req, @Body() data: CreatePostDto) {
    const { userId } = req.user;

    const output = await this.postsService.create(data, userId);

    return output;
  }

  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ) {
    const output = await this.postsService.update(id, data);

    return output;
  }

  @ApiResponse({
    status: 200,
    description: 'The post has been successfully removed',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const output = await this.postsService.delete(id);

    return output;
  }
}
