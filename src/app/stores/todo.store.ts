import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service'

type FilterType = 'all' | 'completed' | 'pending';

@Injectable({ providedIn: 'root' })
export class TodoStore {
    private _todos = signal<Todo[]>([]);
    private _selectedTodo = signal<Todo | null>(null);
    private _loading = signal<boolean>(true);
    private _filter = signal<FilterType>('all');

    readonly todos = computed(() => {
        const filter = this._filter();
        const todos = this._todos();

        switch (filter) {
            case 'completed': return todos.filter(t => t.completed);
            case 'pending': return todos.filter(t => !t.completed);
            default: return todos;
        }
    });
    readonly selectedTodo = computed(() => this._selectedTodo());
    readonly loading = computed(() => this._loading());
    readonly currentFilter = computed(() => this._filter());

    constructor(private todoService: TodoService) { }

    async loadTodos(): Promise<void> {
        const todos = await this.todoService.fetchTodos();
        this._todos.set(todos);
        this._loading.set(false);
    }

    async add(newTodo: Partial<Todo>): Promise<void> {
        const created = await this.todoService.createTodo(newTodo);
        this._todos.update(t => [...t, created]);
    }

    async update(update: Partial<Todo>, id: string): Promise<void> {
        const updated = await this.todoService.updateTodo(update, id);
        this._todos.update(t => t.map(x => x.id === updated.id ? updated : x));
    }

    async delete(id: string): Promise<void> {
        await this.todoService.deleteTodo(id);
        this._todos.update(t => t.filter(x => x.id !== id));
    }

    select(todo: Todo): void {
        this._selectedTodo.set(todo);
    }

    clearSelection(): void {
        this._selectedTodo.set(null);
    }

    setFilter(filter: FilterType): void {
        this._filter.set(filter);
    }
}