import { Routes } from '@angular/router';

import { resolveUserTasks } from '../tasks/resolveUserTasks';
import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';
import { TasksComponent } from '../tasks/tasks.component';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: "",
    providers: [TasksService],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        //loadComponent: () => import("../tasks/tasks.component").then(mod => mod.TasksComponent),
        component: TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
      },
    ]
  },
];
