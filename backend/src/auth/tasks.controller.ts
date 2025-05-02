import {
    Controller,
    Get,
    Post,
    UseGuards,
    Body,
    Req,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  interface AuthRequest extends Request {
    user: { userId: string }; // Extend Express Request to include user
  }
  
  @Controller('tasks')
  @UseGuards(JwtAuthGuard)
  export class TasksController {
    @Get()
    @HttpCode(HttpStatus.OK)
    getTasks(@Req() req: AuthRequest) {
      const userId = req.user.userId;
      // Replace with actual service call if available
      return [
        { id: 1, title: 'Secure Task A', userId },
        { id: 2, title: 'Secure Task B', userId },
      ];
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createTask(@Body() task: any, @Req() req: AuthRequest) {
      const userId = req.user.userId;
      // Replace with actual DB save logic via service
      return {
        id: Math.floor(Math.random() * 1000), // Fake ID
        ...task,
        userId,
      };
    }
  }
  