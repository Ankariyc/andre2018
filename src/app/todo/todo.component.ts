import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  editModeStatus: boolean;
  currIndex: number;
  error: boolean;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
    this.editModeStatus = false;
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  add(text: string): void {

    text = text.trim();

    const doneStatus = false;
    if (!text) {
      this.error = true;
      return;
    } else { this.error = false; }
    if ( this.todos.length > 0) {
    this.todoService.addTodo({ text, doneStatus } as Todo)
      .subscribe(() => {
        this.getTodos();
      });
    } else {
      this.todoService.addTodo({ id: 1, text, doneStatus } as Todo)
      .subscribe(() => {
        this.getTodos();
      });
    }
  }

  save(todo: Todo, text: string): void {
    todo.text = text;
    this.todoService.updateTodo(todo)
      .subscribe(() => {
        this.editModeStatus = false;
        this.getTodos();
        console.log(this.todos);
      });
  }

  delete(todo: Todo): void {
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


}
