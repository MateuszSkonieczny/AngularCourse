import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.module';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  data = input.required<Ticket>();

  close = output();

  detailsVisible = signal(false);

  onToggleDetails(){
    //this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update(value => !value);
  }

  onMatkAsCompleted(){
    this.close.emit();
  }
}
