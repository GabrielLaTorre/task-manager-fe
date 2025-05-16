import { Component, inject, Input } from '@angular/core';
import { TodoStore } from '../../stores/todo.store';
import { Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

  @Input() todo!: Todo;
  private _snackBar = inject(MatSnackBar)

  constructor(
    private store: TodoStore,
    private router: Router
  ) { }

  async toggle(todo: Todo) {
    try {
      await this.store.update({ completed: !todo.completed }, todo.id);

      this._snackBar.open(`Todo ${!todo.completed ? 'completed' : 'uncompleted'}`, 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success']
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
      this._snackBar.open('Error toggling todo', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error']
      });
    }
  }

  edit(todo: Todo) {
    this.store.select(todo);
    this.router.navigate(['/edit', todo.id]);
  }

  async remove(id: string) {
    try {
      await this.store.delete(id);
      this._snackBar.open('Todo deleted', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success']
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      this._snackBar.open('Error deleting todo', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
