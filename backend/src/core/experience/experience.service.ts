import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ExperienceService {}

@Injectable()
export class ExperienceServiceImpl implements ExperienceService {}
