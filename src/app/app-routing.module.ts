import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

const routes: Routes = [
  {path: '' , loadChildren: () => AuthModule},
  {path: 'todo' , loadChildren: () => TodoModule}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
