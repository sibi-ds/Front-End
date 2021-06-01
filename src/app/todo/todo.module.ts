import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TodoRouting } from './todo-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { TasksComponent } from './tasks/tasks.component';
import { SubTasksComponent } from './sub-tasks/sub-tasks.component';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CategoriesComponent,
    TasksComponent,
    SubTasksComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    TodoRouting,
    FormsModule
  ]
})
export class TodoModule { }
