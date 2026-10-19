import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from 'src/app/services/todo.service';

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    // fake servvice with getTodos() we control
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodos']);

    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      // "when the component ask for TodoService,, give it the fake insted"
      providers: [{ provide: TodoService, useValue: todoServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
  });

  it('renders a list item for each todo', async () => {
    todoServiceSpy.getTodos.and.returnValue(
      Promise.resolve([
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: true },
      ]),
    );

    fixture.detectChanges(); // 1st render: runs ngOnInit, starts loading
    await fixture.whenStable(); // wait until the getTodos() Promise is done
    fixture.detectChanges(); // 2nd render: now with the todos

    const items = fixture.nativeElement.querySelectorAll('li');

    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('First');
  });

  it('checks error message for failed render', async () => {
    todoServiceSpy.getTodos.and.returnValue(Promise.reject(new Error('boom')));
    fixture.detectChanges(); // 1st render: runs ngOnInit, starts loading
    await fixture.whenStable(); // wait until the error Promise is done
    fixture.detectChanges(); // 2nd render: now with the updated error promise

    const errorItem = fixture.nativeElement.querySelector('.error-message');
    expect(errorItem).toBeTruthy();

    expect(errorItem.textContent).toContain(
      'Could not load todos. Please try again',
    );
  });
});
