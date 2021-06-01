import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  showTasksContainer = false;

  constructor() { }

  categories : any = [
    {
      name: "My Day",
      icon: "fas fa-sun",
      // tasks: [{taskName:"sibi", subTasks: ["s","i"]}]
      tasks: [{taskName:"sibi", subTasks: []}]
    },

    {
      name: "Important",
      icon: "fas fa-star",
      tasks: []
    },

    {
      name: "Planned",
      icon: "fas fa-calendar-alt",
      tasks: []
    },

    {
      name: "Assigned To You",
      icon: "fas fa-user",
      tasks: []
    },

    {
      name: "Tasks",
      icon: "fas fa-home",
      tasks: []
    }
  ]

  tasks : any = [];
  subTasks : any = [];

  categoryName !: string;
  taskName !: string;

  getCategories() {
    return this.categories;
  }

  addCategory(categoryName: string) {
    if (this.categories.some((category: any) => category.name === categoryName)) {
      alert("Category Name Already Exist");
    } else if (categoryName === "") {
      alert("Category Name can Not Be Empty");
    } else {
      this.categories.push(
        {
          name: categoryName,
          icon: "fas fa-bars",
          tasks : []
        }
      );
    }
  }

  setCategoryName(categoryName: string) {
    this.categoryName = categoryName;
  }

  addTask(taskName: string) {
    if (taskName === "") {
      alert("Task Name Can Not Be Empty");
    } else {
      console.log(taskName)
      console.log(this.categoryName)
      console.log(this.categories);
      for (let i = 0 ; i < this.categories.length ; i++) {
        if (this.categories[i].name === this.categoryName) {
          this.categories[i].tasks.push({ taskName : taskName, subTasks : [] });
          break;
        }
      }
    }
  }

  getTasks() {
    this.showTasksContainer = true;
    console.log(this.showTasksContainer);
    for (let i = 0 ; i < this.categories.length ; i++) {
      if (this.categories[i].name === this.categoryName) {
        this.tasks = this.categories[i].tasks;
        break;
      }
    }

    return this.tasks;
  }

  setTaskName(taskName: string) {
    this.taskName = taskName;
  }

  addSubTask(subTaskName: string) {
    this.categories.forEach((category : any) => {
      if (category.name === this.categoryName) {
        for (let i = 0 ; i < category.tasks.length ; i++) {
          if (category.tasks[i].taskName === this.taskName) {
            category.tasks[i].subTasks.push(subTaskName);
          }
        }
      }
    })
  }

  getSubTasks() {
    this.categories.forEach((category : any) => {
      if (category.name === this.categoryName) {
        category.tasks.forEach((task : any) => {
          if (task.taskName === this.taskName) {
            this.subTasks = task.subTasks;
          }
        })
      }
    })

    return this.subTasks;
  }
}
