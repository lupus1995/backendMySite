import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { ProjectsRepository } from './projects.repository';
import { MONGOOSE_LINK_NEST } from '../../../constants';
import {
  connection,
  logger,
  model,
} from '../../../utils/repositories/mockData';
import { Projects } from '../../../utils/schemas/blog/projects.schema';
import { ProjectDto } from '../../projects/dto/project.dto';

describe('ProjectsRepository', () => {
  let projectsRepository: ProjectsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_NEST),
          useValue: connection,
        },
        {
          provide: getModelToken(Projects.name, MONGOOSE_LINK_NEST),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    projectsRepository = module.get<ProjectsRepository>(ProjectsRepository);
  });

  it('create', () => {
    expect(projectsRepository.create).toBeDefined();
  });

  it('update', async () => {
    expect(
      await projectsRepository.update({ id: 'id', data: {} as ProjectDto }),
    ).toBe('updateOne');
  });

  it('delete', async () => {
    expect(await projectsRepository.delete('id')).toBe('deleteOne');
  });

  it('findById', async () => {
    expect(await projectsRepository.findById('id')).toBe('findById');
  });

  it('getAll', () => {
    expect(projectsRepository.getAll).toBeDefined();
  });
});
