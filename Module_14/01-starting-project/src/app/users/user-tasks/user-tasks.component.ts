import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  //userId = input.required<string>();

  userName = "";

  private usersService = inject(UsersService);
  private activetedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  /* userName = computed(
    () => this.usersService.users.find(e => e.id === this.userId())?.name
  ); */

  ngOnInit(): void {
    console.log(this.activetedRoute);
    const subscription = this.activetedRoute.paramMap.subscribe({
      next: paramMap => { 
        this.userName = this.usersService.users.find(u => u.id === paramMap.get("userId"))?.name || "";
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
