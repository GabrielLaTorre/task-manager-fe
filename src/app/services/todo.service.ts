import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  mockedTodos: Todo[] = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
    { id: 4, title: 'Todo 4', completed: true },
    { id: 5, title: 'Todo 5', completed: false }
  ];
  fetchTodos(): Promise<Todo[]> {
    // return firstValueFrom(this.http.get<Todo[]>(this.apiUrl));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockedTodos);
      }, 200);
    })
  }

  createTodo(todo: Todo): Promise<Todo> {
    return firstValueFrom(this.http.post<Todo>(this.apiUrl, todo));
  }

  updateTodo(todo: Todo): Promise<Todo> {
    return firstValueFrom(this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo));
  }

  deleteTodo(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}