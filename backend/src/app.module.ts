import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeedModule } from 'src/core/feed/feed.module';
import { ProjectsModule } from 'src/core/projects/projects.module';
import { ProfileModule } from 'src/core/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [] }),
    FeedModule,
    ProjectsModule,
    ProfileModule,
  ],
})
export class AppModule {}
