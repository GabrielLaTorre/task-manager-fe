import { Component, inject } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoStore } from '../../stores/todo.store';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  todoTitle: string = '';
  isEditMode = false;
  selectedTodo: Todo | null = null;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private store: TodoStore,
    private router: Router
  ) {
    this.selectedTodo = store.selectedTodo();

    if (this.selectedTodo) {
      this.todoTitle = { ...this.selectedTodo }.title;
      this.isEditMode = true;
    }
  }

  async save() {

    try {
      if (this.isEditMode) {
        await this.store.update({
          title: this.todoTitle,
        }, this.selectedTodo!.id);
      } else {
        await this.store.add({
          title: this.todoTitle,
          completed: false,
        });
      }
      this.store.clearSelection();
      this._snackBar.open(`Todo ${this.isEditMode ? 'updated' : 'added'}`, 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error saving todo:', error);
      this._snackBar.open('Error saving todo', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error']
      });
      return;
    }
  }

  goBack() {
    this.store.clearSelection();
    this.router.navigate(['/']);
  }
}
