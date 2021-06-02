import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  isCategoryPresent = false;
  categoryName = "";
  taskName = "";
  tasks : any = [];

  constructor(private route: ActivatedRoute, private router: Router
    , private actionsService : ActionsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(category => {
      this.categoryName = category.categoryName;

      if (category.categoryName !== undefined) {
        this.isCategoryPresent = true;
      } else {
        this.isCategoryPresent = false;
      }

      this.actionsService.setCategoryName(this.categoryName);
      this.tasks = this.actionsService.getTasks();
    });
  }

  addTask() {
    this.actionsService.addTask(this.taskName);
    this.taskName = "";
  }

  showSubTasks(taskName : string) {
    this.router.navigate(["todo/todo"], {queryParams: {taskName : taskName, categoryName : this.categoryName}});  
    this.actionsService.setTaskName(taskName);
  }

}
