import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { TodoComponent } from './todo/todo.component';
import { TodoApiComponent } from './todo-api/todo-api.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'todo-api', component: TodoApiComponent },
  { path: 'stopwatch', component: StopwatchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
