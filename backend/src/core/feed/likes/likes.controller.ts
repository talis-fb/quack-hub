import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { LikesData } from './likes.entity';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get(':postId')
  async getLikesByPost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.likesService.getLikes(postId);
  }

  @Post()
  async createLike(@Body() likesData: LikesData) {
    return await this.likesService.createLikes(likesData);
  }

  @Delete(':id')
  async deleteLike(@Param('id', ParseIntPipe) id: number) {
    return await this.likesService.deleteLikes(id);
  }
}
