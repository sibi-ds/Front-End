(function () {
    var categories = [
        {
            name: "My Day",
            icon: "fas fa-sun",
            tasks: [{name:"hey",subTasks:[]}]
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
        leftContainer.click(selectCategory);
        categoryInput.keypress(addCategory);
        tasks.click(selectTask);
        taskInput.keypress(addTask);
        subTaskInput.keypress(addSubTask);
        middleContainer.hide();
    }

    const leftContainer = $('.left-container');
    const categoriesList = $('.categories');
    const categoryInput = $('.new-category');
    const middleContainer = $('.middle-container');
    const tasks = $('.tasks');
    const taskInput = $('.new-task');
    const rightContainer = $('.right-container');
    const subTasksList = $('.sub-tasks');
    const subTaskInput = $('.new-sub-task');

    /**
     * render pre defined categories
     */
    function renderCategories() {
        for (var i = 0; i < categories.length; i++) {
            categoriesList.append(renderCategory(categories[i].name, categories[i].icon));
        }
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
        const list = $('<li/>');
        list.append($('<i/>').addClass(iconName));
        list.append(name);
        return list;
    }

    /**
     * captures the categoty selection
     * 
     * @param event which is the result of category selection
     */
    function selectCategory(event) {
        if (event.target.tagName === "LI") {
            tasks.text("");
            renderTasks(event.target.textContent);
            middleContainer.show();
        }
    }

    /**
     * captures the new categoty name
     * 
     * @param event which is the result of new category creation
     */
    function addCategory(event) {
        if ("Enter" === event.key) {
            if (categories.some(category => category.name === event.target.value)) {
                alert("Category Name Already Exist");
            } else if ("" === event.target.value) {
                alert("Category name Can Not Be Empty")
            } else {
                categories.push({ name: event.target.value, icon: "fas fa-bars", tasks: [] });
                categoriesList.append(renderCategory(event.target.value, "fas fa-bars"));
            }
        }
    }

    /**
     * renders tasks of a particular category
     * 
     * @param categoryName category name
     */
    function renderTasks(categoryName) {
        $('.category-name').text(categoryName);
        $('.new-task').attr("id", categoryName);
        rightContainer.css("display", "none");
        middleContainer.css("width", "80.5%");

        for (var i = 0; i < categories.length; i++) {
            if (categoryName === categories[i].name) {
                categories[i].tasks.forEach((task) => {
                    tasks.append(renderTask(task.name, categoryName));
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
    function renderTask(taskName, categoryName) {
        var task = $('<li/>');
        task.append($('<input/>').attr("type", "checkbox"));
        task.append($('<span/>').append(taskName).addClass(categoryName));
        task.append($('<icon/>').addClass("far fa-star"));
        return task;
    }

    /**
     * captures the task selection
     * 
     * @param event which is the result of task selection 
     */
    function selectTask(event) {
        if (event.target.tagName === "SPAN") {
            subTasksList.text("");
            renderSubTasks(event.target.textContent);
            middleContainer.css("width", "61.5%");
            rightContainer.css("display", "inline-block");
        }
    }

    /**
     * adds new task to a category
     * 
     * @param event which is the result of new task creation
     */
    function addTask(event) {
        if ("Enter" === event.key) {
            for (var i = 0; i < categories.length; i++) {
                if (event.target.id === categories[i].name) {
                    if ("" === event.target.value) {
                        alert("Task Name Can Not Be Empty");
                    } else if (categories[i].tasks.some((task) => task.name === event.target.value)) {
                        alert("Task Name Already Exist");
                    } else {
                        categories[i].tasks.push({ name: event.target.value, subTasks: [] });
                        tasks.append(renderTask(event.target.value, event.target.id));
                    }

                    break;
                }
            }
        }
    }

    /**
     * renders sub tasks of a particular task
     * 
     * @param name name of the task
     */
    function renderSubTasks(name) {
        $('.task-name').text(name);
        $('.new-sub-task').attr("id", name);

        categories.forEach((category) => {
            category.tasks.forEach((task) => {
                if (name === task.name) {
                    for (var i = 0; i < task.subTasks.length; i++) {
                        subTasksList.append(renderSubTask(task.subTasks[i]));
                    }
                }
            })
        });
    }

    /**
     * add a sub task to a task
     * 
     * @param event which is the result of sub task addition
     */
    function addSubTask(event) {
        if ("Enter" === event.key) {
            categories.forEach((category) => {
                for (var i = 0; i < category.tasks.length; i++) {
                    if (event.target.id === category.tasks[i].name) {
                        category.tasks[i].subTasks.push(event.target.value);
                        break;
                    }
                }
            });

            subTasksList.append(renderSubTask(event.target.value));
        }
    }

    /**
     * renders sub task
     * 
     * @param subTaskName name of the sub task
     * 
     * @return list element of a subtask
     */
    function renderSubTask(subTaskName) {
        var subTask = $('<li/>');
        subTask.append($('<input/>').attr("type", "checkbox"));
        subTask.append($('<span/>').append(subTaskName));
        return subTask;
    }

    init();
})();
