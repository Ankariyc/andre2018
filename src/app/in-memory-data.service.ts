import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos: Todo[] = [];
    return {todos};
  }
}
