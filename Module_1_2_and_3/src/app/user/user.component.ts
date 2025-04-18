import { Component, Input, input, computed, Output, EventEmitter, output } from '@angular/core';
import { type User } from './user.model';
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [CardComponent]
})
export class UserComponent {
  @Input({required: true}) user!: User;
  @Input({required: true}) selected!: boolean;
  
  @Output() select = new EventEmitter<string>();
  //select = output<string>();

  get imagePath(){
    return 'users/' + this.user.avatar;
  }

  onSelectUser(){
    this.select.emit(this.user.id);
  }
}

/* Component parameters with signals

import { Component, Input, input, computed } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // Version without input signals
  //@Input({ required: true })  avatar!: string;
  //@Input({ required: true })  name!: string;

  //Version with input signals
  avatar = input.required<string>();
  name = input.required<string>();

  imagePath = computed(() => {
    return 'users/' + this.avatar();
  })

  onSelectUser(){
    
  }
}
*/



/*
import { Component, signal, computed } from '@angular/core';

import { DUMMY_USERS } from '../dummy-users';

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  selectedUser = signal(DUMMY_USERS[randomIndex]);
  imagePath = computed(() => 'users/' + this.selectedUser().avatar)


  get imagePath(){
    return 'users/' + this.selectedUser().avatar;
  }

  onSelectUser(){
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser.set(DUMMY_USERS[randomIndex])

  }

  // Version without signal
  //onSelectUser(){
    //const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    //this.selectedUser = DUMMY_USERS[randomIndex];

  //}
}

*/