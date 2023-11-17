import { Module } from '@nestjs/common';

import { ImageModule } from 'src/blog/utils/image/image.module';
import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TokensModule, RepositoriesModule, ImageModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
