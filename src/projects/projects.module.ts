import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ImageModule } from 'src/utils/image/image.module';
import { RepositoriesModule } from 'src/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

@Module({
  imports: [TokensModule, RepositoriesModule, ImageModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
