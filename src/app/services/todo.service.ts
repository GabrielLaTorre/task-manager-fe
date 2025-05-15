import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: number): Todo | undefined {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(todo: Todo) {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index > -1) this.todos[index] = todo;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}
