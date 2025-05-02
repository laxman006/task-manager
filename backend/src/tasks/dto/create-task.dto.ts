import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class CreateTaskDto {
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsEnum(['low', 'medium', 'high'])
    priority?: 'low' | 'medium' | 'high';
  
    @IsOptional()
    @IsEnum(['todo', 'in-progress', 'done'])
    status?: 'todo' | 'in-progress' | 'done';
  
    @IsOptional()
    @IsDateString()
    dueDate?: string;
  
    @IsOptional()
    @IsString()
    createdBy?: string; // This will be set from `req.user`
  }