import { Component } from '@angular/core';

import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  standalone: false,
  //imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  users = DUMMY_USERS;
  selectedUserId?: string;

  onSelectUser(id:string){
    this.selectedUserId = id;
  }

  get selectedUser(){
    return DUMMY_USERS.find(user => user.id === this.selectedUserId);
  }
}
