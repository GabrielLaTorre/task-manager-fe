import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service'

@Injectable({ providedIn: 'root' })
export class TodoStore {
    private _todos = signal<Todo[]>([]);
    private _selectedTodo = signal<Todo | null>(null);
    private _loading = signal<boolean>(true);

    readonly todos = computed(() => this._todos());
    readonly selectedTodo = computed(() => this._selectedTodo());
    readonly loading = computed(() => this._loading());

    constructor(private todoService: TodoService) { }

    async loadTodos(): Promise<void> {
        const todos = await this.todoService.fetchTodos();
        console.log('Fetched todos', todos);
        this._todos.set(todos);
        this._loading.set(false);
    }

    async add(todo: Todo): Promise<void> {
        const newTodo = await this.todoService.createTodo(todo);
        this._todos.update(t => [...t, newTodo]);
    }

    async update(todo: Todo): Promise<void> {
        const updated = await this.todoService.updateTodo(todo);
        this._todos.update(t => t.map(x => x.id === updated.id ? updated : x));
    }

    async delete(id: number): Promise<void> {
        await this.todoService.deleteTodo(id);
        this._todos.update(t => t.filter(x => x.id !== id));
    }

    select(todo: Todo): void {
        this._selectedTodo.set(todo);
    }

    clearSelection(): void {
        this._selectedTodo.set(null);
    }
}