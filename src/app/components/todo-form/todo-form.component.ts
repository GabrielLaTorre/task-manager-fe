import { Component, inject } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoStore } from '../../stores/todo.store';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  isEditMode = false;
  selectedTodo: Todo | null = null;
  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
  });
  private _snackBar = inject(MatSnackBar);

  constructor(
    private store: TodoStore,
    private router: Router
  ) {
    this.selectedTodo = store.selectedTodo();

    if (this.selectedTodo) {
      this.todoForm.setValue({
        title: { ... this.selectedTodo }.title,
      });
      this.isEditMode = true;
    }
  }

  async save() {
    try {
      if (this.isEditMode) {
        await this.store.update({
          title: this.todoForm.value.title!,
        }, this.selectedTodo!.id);
      } else {
        await this.store.add({
          title: this.todoForm.value.title!,
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
