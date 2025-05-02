import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      register: jest.fn().mockImplementation((dto) => ({
        id: 'user123',
        username: dto.username,
        email: dto.email,
      })),
      login: jest.fn().mockImplementation((dto) => {
        if (dto.username === 'testuser' && dto.password === 'password') {
          return { token: 'fake-jwt-token' };
        }
        throw new Error('Invalid credentials');
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto = { name: 'Test User', email: 'testuser@example.com', password: 'password' };
    const result = await authController.register(dto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('userId');
  });

  it('should login a user', async () => {
    const dto = { email: 'testuser@example.com', password: 'password' };
    const result = await authController.login(dto);
    expect(result).toHaveProperty('token');
  });

  it('should throw error for invalid login', async () => {
    const dto = { email: 'invaliduser@example.com', password: 'wrongpassword' };
    await expect(authController.login(dto)).rejects.toThrow('Invalid credentials');
  });
});
