import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Learn standalone components',
      completed: true,
    },
    {
      id: 2,
      title: 'Build TodoService',
      completed: false,
    },
  ];

  async getTodos(): Promise<Todo[]> {
    await this.delay(1500);
    return [...this.todos];
    // throw new Error('boom'); for testing
  }
  async addTodo(title: string): Promise<Todo> {
    await this.delay(1500);
    const maxId =
      this.todos.length > 0
        ? Math.max(...this.todos.map((item) => item.id))
        : 0;
    const newTodo = {
      id: maxId + 1,
      title: title,
      completed: false,
    };

    this.todos = [...this.todos, newTodo];
    return newTodo;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((reslove) => setTimeout(reslove, ms));
  }
}
