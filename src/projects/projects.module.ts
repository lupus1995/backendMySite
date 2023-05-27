import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Projects, ProjectsSchema } from '../schemas/projects.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/utils/image/image.module';
import { ProjectsRepository } from './projects.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Projects.name, schema: ProjectsSchema },
    ]),
    AuthModule,
    ImageModule,
  ],
  providers: [ProjectsService, ProjectsRepository],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
