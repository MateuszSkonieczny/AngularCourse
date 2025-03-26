import { AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit, AfterViewInit {

  @ViewChild("form") form?: ElementRef<HTMLFormElement>; 
  //rivate form = viewChild.required<ElementRef<HTMLFormElement>>("form");


  onSubmit(title: string, request: string){
    this.form?.nativeElement.reset();
  }

  ngOnInit(): void {
    console.log("OnInit");
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit(): void {
    console.log("After view init");
    console.log(this.form?.nativeElement);
  }
}
