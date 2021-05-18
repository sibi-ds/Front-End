(function () {
    var categories = [
        {
            name: "My Day",
            icon: "fas fa-sun",
            tasks: ["happy", "now"]
        },

        {
            name: "Important",
            icon: "fas fa-star",
            tasks: ["h"]
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

    function renderCategories() {
        var categoriesList = document.getElementsByClassName("categories")[0];

        for (let i = 0; i < categories.length; i++) {
            categoriesList.appendChild(renderCategory(categories[i].name, categories[i].icon));
        }
    }

    let categoryInput = document.getElementById("new-category");
    categoryInput.addEventListener("keypress", (event) => {
        if ("Enter" === event.key) {
            if (categories.some(category => category.name === event.target.value)) {
                alert("Category Name Already Exist");
            } else if ("" === event.target.value) {
                alert("Category name Can Not Be Empty")
            } else {
                categories.push({ name: event.target.value, icon: "fas fa-bars", tasks: [] });
                console.log(categories);
                var categoriesList = document.getElementsByClassName("categories")[0];
                categoriesList.appendChild(renderCategory(event.target.value, "fas fa-bars"));
            }
        }
    });

    let categorySelection = document.getElementsByClassName("left-container")[0];
    categorySelection.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            console.log(event.target.id);
            renderTasks(event.target.id);
        }
    });

    function renderCategory(name, iconName) {
        var list = document.createElement("li");
        var icon = document.createElement("i");
        icon.className = iconName;
        list.id = name;
        list.appendChild(icon);
        list.appendChild(document.createTextNode(name));
        return list;
    }

    function renderTasks(id) {
        for (let i = 0; i < categories.length; i++) {
            var tasks = document.getElementsByClassName("tasks")[0];

            while (tasks.firstChild) {
                tasks.removeChild(tasks.firstChild);
            }

            if (id === categories[i].name) {
                var header = document.createElement("h3");
                header.appendChild(document.createTextNode(id));
                tasks.appendChild(header);
                var newTask = document.createElement("input");
                newTask.placeholder = "New Task";
                newTask.className = "new-task";
                tasks.appendChild(newTask);
                console.log(tasks);

                categories[i].tasks.forEach((taskName) => {
                    tasks.appendChild(renderTask(taskName));
                });

                getTask(id);

                break;
            }
        }
    }

    function renderTask(taskName) {
        var task = document.createElement("li");
        task.className = "task";
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "taskCheck";
        task.appendChild(checkBox);
        task.appendChild(document.createTextNode(taskName));
        return task;
    }

    function getTask(id) {
        let taskInput = document.getElementsByClassName("new-task")[0];
        taskInput.addEventListener("keypress", (event) => {
            if ("Enter" === event.key) {
                for (let i = 0 ; i < categories.length ; i++) {
                    if (id === categories[i].name) {
                        categories[i].tasks.push(event.target.value);
                        var tasks = document.getElementsByClassName("tasks")[0];
                        tasks.appendChild(renderTask(event.target.value));
                        break;
                    }
                }
            }
        });
    }

    init();
})();
