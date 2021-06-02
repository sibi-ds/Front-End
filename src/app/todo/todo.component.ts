import { Component, OnInit } from '@angular/core';
import { ActionsService } from './actions.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

  constructor(private actionsService : ActionsService) { }

  ngOnInit(): void {
  }
}
