import { Component, Input } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { type NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent]
})
export class TasksComponent {
  @Input({required: true}) userId!: string;
  @Input({required: true}) userName!: string;

  isAddingTask = false;

  constructor(private tasksService: TasksService) {}

  get selectedUserTasks(){
    return this.tasksService.getUserTasks(this.userId);
  }
  
  onCompleteTask(id: string){
    this.tasksService.removeTask(id);
  }

  onStartAddTask(){
    this.isAddingTask = true;
  }

  onCancleAddTask(){
    this.isAddingTask = false;
  }

  onAddTask(taskData: NewTaskData){
    this.tasksService.addTask(taskData, this.userId);
    this.isAddingTask = false;
  }
}
