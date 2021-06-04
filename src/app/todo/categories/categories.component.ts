import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsService } from '../actions.service'
import { TodoComponent } from '../todo.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  constructor(private actionsService: ActionsService, private router: Router
    , private todoComponent : TodoComponent) { }

  categories : any;
  categoryName = "";

  ngOnInit(): void {
    this.categories = this.actionsService.getCategories();
  }

  addCategory() {
    this.actionsService.addCategory(this.categoryName);
    this.categoryName = "";
  }

  showTasks(categoryName : string) {
    console.log(this.todoComponent.rightContainer);
    this.todoComponent.rightContainer = "d-none";
    this.todoComponent.middleContainer = "col-10";
    this.actionsService.setCategoryName(this.categoryName);
    this.router.navigate(["todo/todo"], {queryParams: {categoryName : categoryName}});
  }
}
