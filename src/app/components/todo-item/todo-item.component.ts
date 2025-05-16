import { Component, Input } from '@angular/core';
import { TodoStore } from '../../stores/todo.store';
import { Router } from '@angular/router';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

  @Input() todo!: Todo;

  constructor(
    private store: TodoStore,
    private router: Router
  ) { }

  async toggle(todo: Todo) {
    await this.store.update({ completed: !todo.completed }, todo.id);
  }

  edit(todo: Todo) {
    this.store.select(todo);
    this.router.navigate(['/edit', todo.id]);
  }

  async remove(id: string) {
    await this.store.delete(id);
  }
}
