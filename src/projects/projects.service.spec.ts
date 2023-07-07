import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { ProjectsRepository } from '../utils/repositories/projects.repository';
import { ImageService } from '../utils/image/image.service';
import { ProjectDto } from './dto/project.dto';

describe('ProjectsService', () => {
  let service: ProjectsService;

  const projectsRepositoryMock = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue('create'),
    findById: jest.fn().mockReturnValue({
      thumbnail: 'thumbnail.111',
    }),
    update: jest.fn().mockReturnValue('update'),
    delete: jest.fn().mockReturnValue('delete'),
    getAll: jest.fn().mockReturnValue('getAll'),
  });

  const imageServiceMock = jest.fn().mockReturnValue({
    saveImageBase64: jest.fn().mockReturnValue('saveImageBase64'),
    deletedFiles: jest.fn().mockReturnValue('deletedFiles'),
    getFile: jest.fn().mockReturnValue('getFile'),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: ProjectsRepository,
          useFactory: projectsRepositoryMock,
        },
        {
          provide: ImageService,
          useFactory: imageServiceMock,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const result = await service.create({ createProject: {} as ProjectDto });

    expect(result).toBe('create');
  });
  it('update', async () => {
    const result = await service.update({
      project: {} as ProjectDto,
      id: '111',
    });

    expect(result).toBe('update');
  });
  it('delete', async () => {
    const result = await service.delete({ id: '333' });

    expect(result).toBe('delete');
  });
  it('getProjects', async () => {
    const result = await service.getProjects({ hasFilter: false });

    expect(result).toBe('getAll');
  });
  it('getProject', async () => {
    const result = await service.getProject({ id: '111' });

    expect(result).toStrictEqual({
      thumbnail: 'thumbnail.111',
    });
  });
  it('getFlile', async () => {
    const result = await service.getFile({ id: 'id', size: 'size' });

    expect(result).toBe('getFile');
  });
});
