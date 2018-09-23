import { Component, OnInit } from '@angular/core';
import { Todo } from '../todoapi';
import { TodoService } from '../todoapi.service';

@Component({
  selector: 'app-todo-api',
  templateUrl: './todo-api.component.html',
  styleUrls: ['./todo-api.component.css']
})
export class TodoApiComponent implements OnInit {
  todos: Todo[];
  editModeStatus: boolean;
  currIndex: number;
  error: boolean;
  loadingStatus: boolean;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
    this.editModeStatus = false;
    this.loadingStatus = true;
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos['todos'];
      this.loadingStatus = false;
    });
  }

  add(title: string): void {
    this.loadingStatus = true;
    title = title.trim();

    const doneStatus = false;
    if (!title) {
      this.error = true;
      return;
    } else { this.error = false; }
    this.todoService.addTodo({ title, username: 'Andre' } as Todo)
      .subscribe(() => {
        this.getTodos();
      });
  }

  save(todo: Todo, title: string): void {
    this.loadingStatus = true;
    todo.title = title;
    this.todoService.updateTodo(todo)
      .subscribe(() => {
        this.editModeStatus = false;
        this.getTodos();
      });
  }

  saveCheckbox(todo: Todo): void {
    this.loadingStatus = true;
    this.todoService.updateTodo(todo)
    .subscribe(() => {
      this.getTodos();
    });
  }

  delete(todo: Todo): void {
    this.loadingStatus = true;
    this.todoService.deleteTodo(todo).subscribe(() => this.getTodos());
  }

  setEditMode(index: number): void {
    this.currIndex = index;
    if (!this.editModeStatus) { this.editModeStatus = true; }
  }

  setReadMode(): void {
    this.editModeStatus = false;
  }

  hideError(): void {
    this.error = false;
  }

  log(todo: Todo): void {
    console.log(todo.completed);
  }

}
