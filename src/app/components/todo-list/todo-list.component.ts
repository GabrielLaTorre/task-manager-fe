import { Component } from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { Router } from '@angular/router';
import { TodoStore } from '../../stores/todo.store';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  constructor(public store: TodoStore, private router: Router) {
    if (this.store.todos().length === 0) {
      this.store.loadTodos();
    }
  }

  async toggle(todo: Todo) {
    await this.store.update({ ...todo, completed: !todo.completed });
  }

  edit(todo: Todo) {
    this.store.select(todo);
    this.router.navigate(['/edit', todo.id]);
  }

  async remove(id: number) {
    await this.store.delete(id);
  }

  addTodo() {
    this.store.clearSelection();
    this.router.navigate(['/new']);
  }
}
