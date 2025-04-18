import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { routes as userRoutes } from "./users/users.routes"
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) =>{
    const router = inject(Router);
    var shouldGetAccess = Math.random();

    if (shouldGetAccess) {
        return true;
    }

    return new RedirectCommand(router.parseUrl("/unauthorized"));
}

export const routes: Routes = [
    {
        path: "",
        component: NoTaskComponent,
        title: "No task selected"
    },
    {
        path: "users/:userId",
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        data: {
            message: "Hello!"
        },
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

