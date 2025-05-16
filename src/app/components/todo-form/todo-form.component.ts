import { Component } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoStore } from '../../stores/todo.store';
import { Router } from '@angular/router';

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
    this.router.navigate(['/']);
  }

  goBack() {
    this.store.clearSelection();
    this.router.navigate(['/']);
  }
}
