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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/CreateCommentDto';
import { UpdateCommentDto } from './dtos/UpdateCommentDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    status: 200,
    description: 'Comment filtered by id returned successfully.',
  })
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.getCommentById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of comments by project id.',
  })
  @Get('/post/:postId')
  async findManyByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return await this.commentsService.getCommentsByPostId(postId);
  }

  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created',
  })
  @Post()
  async create(@Req() req, @Body() data: CreateCommentDto) {
    const { userId } = req.user;
    return await this.commentsService.create(data, userId);
  }

  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCommentDto,
  ) {
   return  await this.commentsService.update(id, data);
  }

  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully removed',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.delete(id);
  }
}
