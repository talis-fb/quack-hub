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
    const resLikes = await this.likesService.getLikes(postId);
    return resLikes;
  }

  @Post()
  async createLike(@Body() likesData: LikesData) {
    const resLike = await this.likesService.createLikes(likesData);
    return resLike;
  }

  @Delete(':id')
  async deleteLike(@Param('id', ParseIntPipe) id: number) {
    const resLike = await this.likesService.deleteLikes(id);
    return resLike;
  }
}
