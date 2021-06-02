import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsService } from '../actions.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  constructor(private actionsService: ActionsService, private router: Router) { }

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
    this.actionsService.setCategoryName(this.categoryName);
    this.router.navigate(["todo/todo"], {queryParams: {categoryName : categoryName}});
  }
}
