import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Todo } from './todoapi';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'https://isha-todos-api.herokuapp.com/todos';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(private http: HttpClient) { }

  getTodos(): Observable<Object> {
    return this.http.get<Object>(this.todosUrl + '/list');
  }

  /** POST: add a new todo to the server */
  addTodo(todo: Todo): Observable<Todo> {

    return this.http.post<Todo>(this.todosUrl + '/add-todo', todo, this.httpOptions).pipe(
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  /** PUT: update the todo on the server */
  updateTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.todosUrl + '/edit-todo', todo, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  /** DELETE: delete the todo from the server */
  deleteTodo(todo: Todo | number): Observable<Object> {
    const id = typeof todo === 'number' ? todo : todo._id;
    const url = `${this.todosUrl}/delete-todo/${id}`;

    return this.http.get<Object>(url, this.httpOptions).pipe(
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
