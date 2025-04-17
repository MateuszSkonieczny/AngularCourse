import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  //userId = input.required<string>();

  userName = input.required<string>();
  message = input.required<string>();

  private usersService = inject(UsersService);
  private activetedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  /* userName = computed(
    () => this.usersService.users.find(e => e.id === this.userId())?.name
  ); */

  ngOnInit(): void {
    // This way you can also get route values, but this code won't be executed if the value changes.
    // NgOnInit will run only once.
    //console.log(this.activetedRoute.snapshot.paramMap.get("userId"));

    console.log(this.message());
    

    /* const subscription = this.activetedRoute.paramMap.subscribe({
      next: paramMap => { 
        this.userName = this.usersService.users.find(u => u.id === paramMap.get("userId"))?.name || "";
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe()); */

    // data from route can be also read in the component directly:
    /* this.activetedRoute.data.subscribe({
      next: data => {
        console.log(data);
      }
    }) */
  }
}

// Function used in app.routes.ts. Dynamicaly returns a values for userName input in the user-tasks component:
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(u => u.id === activatedRoute.paramMap.get("userId"))?.name || "";

  return userName;
}

export const resolveTitle: ResolveFn<string>  = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + '\'s Tasks';
}