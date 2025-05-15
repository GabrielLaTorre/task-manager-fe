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

  constructor(
    private store: TodoStore,
    private router: Router
  ) {
    const selected = store.selectedTodo();

    if (selected) {
      this.todoTitle = { ...selected }.title;
      this.isEditMode = true;
    }
  }

  async save() {
    if (this.isEditMode) {
      await this.store.update({
        title: this.todoTitle,
      });
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
