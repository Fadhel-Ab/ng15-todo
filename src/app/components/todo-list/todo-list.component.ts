import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { AddTodoComponent } from '../add-todo/add-todo.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AddTodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  todos: Todo[] = [];
  isLoading = false;
  errorMessage = '';

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = true;
      this.todos = await this.todoService.getTodos();
      //
    } catch (error) {
      this.errorMessage = 'Could not load todos. Please try again';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  trackByTodoId(index: number, todo: Todo) {
    return todo.id;
  }
  onTodoAdded(todo: Todo) {
    this.todos = [...this.todos, todo];
  }
}
