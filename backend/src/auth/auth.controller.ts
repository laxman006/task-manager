import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../tasks/dto/create-user.dto';
import { LoginDto } from '../tasks/dto/login.tdo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('demo-login')
  async demoLogin(@Res() res: Response) {
    try {
      // Predefined demo user (no JWT required)
      const demoUser = {
        id: 'demo-user-id',
        email: 'demo@taskmanager.com',
        name: 'Demo User',
      };

      // Return a success response with the demo user details
      return res
        .status(200)
        .json({ message: 'Demo login successful', user: demoUser });
    } catch (error) {
      console.error('Demo login failed:', error);
      return res.status(500).json({ message: 'Demo login failed' });
    }
  }
}

