import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-sub-tasks',
  templateUrl: './sub-tasks.component.html',
  styleUrls: ['./sub-tasks.component.css']
})
export class SubTasksComponent implements OnInit {

  categoryName !: string;
  taskName !: string;
  subTaskName !: string;
  subTasks : any = [];

  constructor(private route: ActivatedRoute, private router: Router
    , private actionsService : ActionsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(task => {
      this.categoryName = task.categoryName;
      this.taskName = task.taskName;
      this.subTasks = this.actionsService.getSubTasks();
    });
  }

  addSubTask() {
    this.actionsService.addSubTask(this.subTaskName);
    this.subTaskName = "";
  }
}
