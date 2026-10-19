import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  constructor(private todoService: TodoService) {}

  title = new FormControl('', {
    validators: [Validators.required, Validators.maxLength(100)],
    nonNullable: true,
  });

  @Output() todoAdded = new EventEmitter<Todo>();

  form = new FormGroup({
    title: this.title,
  });

  isSubmitting = false;
  errorMessage = '';

  async onSubmit(): Promise<void> {
    const value = this.form.controls.title.value.trim();
    if (this.form.invalid || this.isSubmitting) return;
    if (value === '') {
      this.errorMessage = 'the title is empty, Please enter a valid title';
      return;
    }
    let newTodo: Todo | null;
    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      const newTodo = await this.todoService.addTodo(value);
      this.todoAdded.emit(newTodo);
      this.form.reset();
    } catch (error) {
      this.errorMessage = 'Could not add a todo. Please try again';
      console.error(error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
