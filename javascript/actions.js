(function () {
    var categories = [
        {
            name: "My Day",
            icon: "fas fa-sun",
            tasks: []
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
    ];

    function init() {
        renderCategories();
    }

    /**
     * render pre defined categories and custom categories
     */
    function renderCategories() {
        var categoriesList = document.getElementsByClassName("categories")[0];

        for (var i = 0; i < categories.length; i++) {
            categoriesList.appendChild(renderCategory(categories[i].name, categories[i].icon));
        }

        var categorySelection = document.getElementsByClassName("left-container")[0];
        categorySelection.addEventListener("click", (event) => {
            if (event.target.tagName === "LI") {
                renderTasks(event.target.id);
            }
        });

        var categoryInput = document.getElementById("new-category");
        categoryInput.addEventListener("keypress", (event) => {
            if ("Enter" === event.key) {
                if (categories.some(category => category.name === event.target.value)) {
                    alert("Category Name Already Exist");
                } else if ("" === event.target.value) {
                    alert("Category name Can Not Be Empty")
                } else {
                    categories.push({ name: event.target.value, icon: "fas fa-bars", tasks: [] });
                    categoriesList.appendChild(renderCategory(event.target.value, "fas fa-bars"));
                }
            }
        });
    }

    /**
     * renders a category
     * 
     * @param name category name
     * @param iconName name of the icon
     * 
     * @return list element of category
     */
    function renderCategory(name, iconName) {
        var list = document.createElement("li");
        var icon = document.createElement("i");
        icon.className = iconName;
        list.id = name;
        list.appendChild(icon);
        list.appendChild(document.createTextNode(name));
        return list;
    }

    /**
     * renders tasks of a particular category
     * 
     * @param id category name
     */
    function renderTasks(id) {
        var middleContainer = document.getElementsByClassName("middle-container")[0];
        var tasks = document.getElementsByClassName("tasks")[0];
        var rightContainer = document.getElementsByClassName("right-container")[0];
        deleteChild(tasks);
        rightContainer.style.display = "none";
        middleContainer.style.width = "80.5%";

        for (var i = 0; i < categories.length; i++) {
            if (id === categories[i].name) {
                var heading = document.createElement("h3");
                heading.appendChild(document.createTextNode(id));
                tasks.appendChild(heading);
                var span = document.createElement("span");
                var icon = document.createElement("i");
                icon.className = "fas fa-plus";
                span.appendChild(icon);
                var newTask = document.createElement("input");
                newTask.placeholder = "New Task";
                newTask.className = "new-task";
                span.appendChild(newTask);
                tasks.appendChild(span);

                var taskId = 1;

                categories[i].tasks.forEach((task) => {
                    tasks.appendChild(renderTask(task.name));
                    taskId++;
                });

                tasks.addEventListener("click", (event) => {
                    if (event.target.tagName === "SPAN") {
                        renderSubTasks(event.target.textContent);
                        console.log(event.target.textContent);
                        middleContainer.style.width = "61.5%";
                        rightContainer.style.display = "inline-block";
                    }
                });

                var taskInput = document.getElementsByClassName("new-task")[0];
                taskInput.addEventListener("keypress", (event) => {
                    if ("Enter" === event.key) {
                        for (var i = 0; i < categories.length; i++) {
                            if (id === categories[i].name) {
                                console.log(categories[i].tasks);
                                categories[i].tasks.push({ name: event.target.value, subTasks: [] });
                                console.log(categories[i].tasks);
                                tasks.appendChild(renderTask(event.target.value));
                                taskId++;
                                break;
                            }
                        }
                    }
                });

                break;
            }
        }
    }

    /**
     * renders task
     * 
     * @param taskName name of the task
     * 
     * @return list element of a task
     */
    function renderTask(taskName) {
        var task = document.createElement("li");
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "taskCheck";
        task.appendChild(checkBox);
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(taskName));
        task.appendChild(span);
        var icon = document.createElement("i");
        icon.className = "far fa-star";
        task.appendChild(icon);
        return task;
    }

    /**
     * renders sub tasks of a particular task
     * 
     * @param name name of the task
     */
    function renderSubTasks(name) {
        var subTasksList = document.getElementsByClassName("sub-tasks")[0];
        deleteChild(subTasksList);

        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        var header = document.createElement("h3");
        header.appendChild(checkBox);
        header.appendChild(document.createTextNode(name));
        subTasksList.appendChild(header);
        var span = document.createElement("span");
        var icon = document.createElement("i");
        icon.className = "fas fa-plus";
        span.appendChild(icon);
        var subTaskInput = document.createElement("input");
        subTaskInput.placeholder = "New Sub Task";
        subTaskInput.className = "new-sub-task";
        span.appendChild(subTaskInput);
        subTasksList.appendChild(span);

        categories.forEach((category) => {
            category.tasks.forEach((task) => {
                if (name === task.name) {
                    for (var i = 0; i < task.subTasks.length; i++) {
                        subTasksList.appendChild(renderSubTask(task.subTasks[i]));
                    }
                }
            })
        });

        var subTaskInputListener = document.getElementsByClassName("new-sub-task")[0];
        subTaskInputListener.addEventListener("keypress", (event) => {
            if ("Enter" === event.key) {
                categories.forEach((category) => {
                    for (var i = 0; i < category.tasks.length; i++) {
                        if (name === category.tasks[i].name) {
                            console.log(category.tasks[i].subTasks);
                            category.tasks[i].subTasks.push(event.target.value);
                            console.log(category.tasks[i].subTasks);
                            break;
                        }
                    }
                });

                subTasksList.appendChild(renderSubTask(event.target.value));
            }
        });
    }

    /**
     * renders sub task
     * 
     * @param subTaskName name of the sub task
     * 
     * @return list element of a subtask
     */
    function renderSubTask(subTaskName) {
        console.log(subTaskName);
        var subTask = document.createElement("li");
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        subTask.appendChild(checkBox);
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(subTaskName));
        subTask.appendChild(span);
        return subTask;
    }

    /**
     * @param parent which need to be hidden
     */
    function deleteChild(parent) {
        parent.innerHTML = "";
    }

    init();
})();
