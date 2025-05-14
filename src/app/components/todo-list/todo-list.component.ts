import { Component } from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, NgFor],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  todos: { id: number, title: string, completed: boolean }[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
    { id: 3, title: 'Deploy to Production', completed: false }
  ];

  addTodo(title: string) {
    const newTodo = { id: this.todos.length + 1, title, completed: false };
    this.todos.push(newTodo);
  }
  toggleTodoCompletion(todo: { id: number, title: string, completed: boolean }) {
    todo.completed = !todo.completed;
  }
  deleteTodo(todo: { id: number, title: string, completed: boolean }) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
  }
}
