import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user?.userId ?? 'unknown'; // Provide a default value for userId when undefined
    return this.tasksService.create({ ...createTaskDto, createdBy: userId });
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.userId ?? null;
    return this.tasksService.findAll({
      $or: [{ createdBy: userId }, { assignedTo: userId }],
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
