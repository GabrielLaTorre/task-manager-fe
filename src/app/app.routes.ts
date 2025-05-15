import { Routes } from '@angular/router';
import { TodoListComponent } from '../app/components/todo-list/todo-list.component';
import { TodoFormComponent } from '../app/components/todo-form/todo-form.component';


export const routes: Routes = [
    { path: '', component: TodoListComponent },
    { path: 'new', component: TodoFormComponent },
    { path: 'edit/:id', component: TodoFormComponent },
];
