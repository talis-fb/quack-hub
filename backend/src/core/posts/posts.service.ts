import { Injectable } from '@nestjs/common';

export abstract class PostsService {}

@Injectable()
export class PostsServiceImpl implements PostsService {}
