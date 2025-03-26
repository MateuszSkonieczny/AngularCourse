import { AfterContentInit, afterNextRender, afterRender, Component, contentChild, ContentChild, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "control",
    '(click)': "onClick()"
  }
})
export class ControlComponent implements AfterContentInit {
  
  constructor(){
    afterRender(() => {
      console.log("afterRender")
    });

    afterNextRender(() => {
      console.log("afterNextRender")
    });
  }

  //@HostBinding("class") className = "control";

  //@HostListener()

  label = input.required<string>();
  private el = inject(ElementRef);
  //@ContentChild("input") private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>("input");

  /* @HostListener('click') onClick(){
    console.log("clicked");
  } */

    ngAfterContentInit(): void {
      
    }

  onClick(){
    console.log("clicked");
    console.log(this.el);
    console.log(this.control());
  }
}
