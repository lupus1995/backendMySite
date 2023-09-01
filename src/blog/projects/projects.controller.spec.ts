import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TokensService } from '../utils/tokens/tokens.service';
import { CanActivate } from '@nestjs/common';
import { TokenGuard } from '../utils/tokens/token.guard';
import { ProjectDto } from './dto/project.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  const projectService = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue('create'),
    update: jest.fn().mockReturnValue('update'),
    delete: jest.fn().mockReturnValue('delete'),
    getProjects: jest.fn().mockReturnValue('getProjects'),
    getProject: jest.fn().mockReturnValue('getProject'),
    getFile: jest.fn().mockReturnValue('getFile'),
  });

  const tokenServiceMock = jest.fn().mockReturnValue({
    checkToken: jest.fn(),
  });

  const tokenGuardMock: CanActivate = {
    canActivate: jest.fn().mockReturnValue(false),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useFactory: projectService,
        },
        {
          provide: TokensService,
          useFactory: tokenServiceMock,
        },
      ],
    })
      .overrideProvider(TokenGuard)
      .useValue(tokenGuardMock)
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getProjects', async () => {
    const result = await controller.getProjects({ hasFilter: false });

    expect(result).toBe('getProjects');
  });

  it('getProject', async () => {
    const result = await controller.getProject('111');

    expect(result).toBe('getProject');
  });

  it('delete project', async () => {
    const result = await controller.deleteProject('111');

    expect(result).toBe('delete');
  });

  it('create project', async () => {
    const result = await controller.createProject({} as ProjectDto);

    expect(result).toBe('create');
  });

  it('updateArticle', async () => {
    const result = await controller.updateProject('id', {} as ProjectDto);

    expect(result).toBe('update');
  });

  it('getFile', async () => {
    const result = await controller.getFile('510', '111');

    expect(result).toBe('getFile');
  });
});
