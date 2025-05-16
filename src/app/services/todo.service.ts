import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchTodos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>(this.apiUrl));
  }

  createTodo(todo: Partial<Todo>): Promise<Todo> {
    return firstValueFrom(this.http.post<Todo>(this.apiUrl, todo));
  }

  updateTodo(todo: Partial<Todo>, id: string): Promise<Todo> {
    return firstValueFrom(this.http.put<Todo>(`${this.apiUrl}/${id}`, todo));
  }

  deleteTodo(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}