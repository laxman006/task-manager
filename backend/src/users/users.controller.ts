import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}