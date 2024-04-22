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

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  async getCommentById(@Param('id', ParseIntPipe) id: number) {
    const output = await this.commentsService.getCommentById(id);

    return output;
  }

  @Get('/post/:postId')
  async getCommentsByPostId(@Param('postId', ParseIntPipe) postId: number) {
    const output = await this.commentsService.getCommentsByPostId(postId);

    return output;
  }

  @Post()
  async create(@Req() req, @Body() data: CreateCommentDto) {
    const { userId } = req.user;

    const output = await this.commentsService.create(data, userId);

    return output;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCommentDto,
  ) {
    const output = await this.commentsService.update(id, data);

    return output;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const output = await this.commentsService.delete(id);

    return output;
  }
}
