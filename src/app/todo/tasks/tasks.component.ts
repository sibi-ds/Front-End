import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from '../actions.service';
import { TodoComponent } from '../todo.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  categoryName = "";
  taskName = "";
  tasks : any = [];

  constructor(private route: ActivatedRoute, private router: Router
    , private actionsService : ActionsService, private todoComponent: TodoComponent) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(category => {
      this.categoryName = category.categoryName;
      this.actionsService.setCategoryName(this.categoryName);
      this.tasks = this.actionsService.getTasks();
    });
  }

  addTask() {
    this.actionsService.addTask(this.taskName);
    this.taskName = "";
  }

  showSubTasks(taskName : string) {
    this.todoComponent.middleContainer = "col-7";
    this.todoComponent.rightContainer = "col-3";
    this.router.navigate(["todo/todo"], {queryParams: {taskName : taskName, categoryName : this.categoryName}});  
    this.actionsService.setTaskName(taskName);
  }

}
