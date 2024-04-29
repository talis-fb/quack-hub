import { Module } from '@nestjs/common';
import { AuthModule } from 'src/core/profile/auth/auth.module';
import { ExperienceModule } from 'src/core/profile/experience/experience.module';
import { UserModule } from 'src/core/profile/user/user.module';

@Module({
  imports: [AuthModule, ExperienceModule, UserModule],
})
export class ProfileModule {}
