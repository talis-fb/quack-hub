import { Module } from '@nestjs/common';
import { UserModule } from 'src/core/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './core/auth/auth.module';
import { ProjectsModule } from './core/projects/projects.module';
import { ExperienceModule } from './core/experience/experience.module';
import { VacanciesModule } from './core/vacancies/vacancies.module';
import { PostsModule } from './core/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [] }),
    UserModule,
    AuthModule,
    ProjectsModule,
    ExperienceModule,
    VacanciesModule,
    VacanciesModule,
    PostsModule,
  ],
  providers: [],
})
export class AppModule {}
