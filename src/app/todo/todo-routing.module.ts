import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HeaderComponent } from './header/header.component';
//import { CategoriesComponent } from './categories/categories.component'
import { TodoComponent } from './todo.component';

const routes: Routes = [
  { path: 'todo', component:  TodoComponent},
  //{ path: 'header', component:  HeaderComponent},
  //{ path: 'categories', component:  CategoriesComponent}
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class TodoRouting { }