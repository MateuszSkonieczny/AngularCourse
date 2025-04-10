import { Component, EventEmitter, inject, Output, signal, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required: true}) userId!: string;

  @Output() close = new EventEmitter<void>();

  enteredTitle = "";

  /* Version with signals does not require any change in the html code
  You still use ngModel. */
  //enteredTitle = signal("");

  enteredSummary = "";
  eneteredDate = "";

  private taskService = inject(TasksService);

  onCancle(){
    this.close.emit();
  }

  onSubmit(){
    this.taskService.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.eneteredDate
    }, this.userId);

    this.close.emit();
  }
}
