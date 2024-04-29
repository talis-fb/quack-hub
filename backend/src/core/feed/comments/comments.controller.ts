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
    const output = await this.commentsService.getCommentById(id);

    return output;
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of comments by project id.',
  })
  @Get('/post/:postId')
  async findManyByPostId(@Param('postId', ParseIntPipe) postId: number) {
    const output = await this.commentsService.getCommentsByPostId(postId);

    return output;
  }

  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created',
  })
  @Post()
  async create(@Req() req, @Body() data: CreateCommentDto) {
    const { userId } = req.user;

    const output = await this.commentsService.create(data, userId);

    return output;
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
    const output = await this.commentsService.update(id, data);

    return output;
  }

  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully removed',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const output = await this.commentsService.delete(id);

    return output;
  }
}
