import { Projects } from '../../schemas/projects.schema';
import { ProjectsRepository } from './projects.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { connection, logger, model } from './mockData';
import { Logger } from '@nestjs/common';
import { ProjectDto } from '../../projects/dto/project.dto';

describe('ProjectsRepository', () => {
  let projectsRepository: ProjectsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsRepository,
        {
          provide: getConnectionToken('Database'),
          useValue: connection,
        },
        {
          provide: getModelToken(Projects.name),
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
