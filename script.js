// ==========================================
// CAREER TASK BUILDER
// ==========================================


const defaultTasks = {

    testing: [
        {
            name: "Learn SDLC",
            priority: "medium",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Learn STLC",
            priority: "medium",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Create Test Cases",
            priority: "high",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Create Bug Reports",
            priority: "high",
            date: "",
            notes: "",
            link: "",
            completed: false
        }
    ],


    data: [
        {
            name: "Find Dataset",
            priority: "high",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Clean Data",
            priority: "high",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Excel Analysis",
            priority: "medium",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Create SQL Queries",
            priority: "medium",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Create Power BI Dashboard",
            priority: "high",
            date: "",
            notes: "",
            link: "",
            completed: false
        }
    ],


    internship: [
        {
            name: "Update Resume",
            priority: "high",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Find Internship Opportunities",
            priority: "high",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Apply for Internship",
            priority: "high",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Contact HR",
            priority: "medium",
            date: "",
            notes: "",
            link: "",
            completed: false
        },

        {
            name: "Track Application Status",
            priority: "medium",
            date: "",
            notes: "",
            link: "",
            completed: false
        }
    ]

};


// LOAD SAVED DATA

let tasks =
    JSON.parse(
        localStorage.getItem("careerBuilderTasks")
    ) || defaultTasks;


let currentCategory = "testing";

let currentFilter = "all";

let editingIndex = null;


// ELEMENTS

const dashboard =
    document.getElementById("dashboard");

const taskManager =
    document.getElementById("taskManager");

const taskTitle =
    document.getElementById("taskTitle");

const taskDescription =
    document.getElementById("taskDescription");

const taskInput =
    document.getElementById("taskInput");

const prioritySelect =
    document.getElementById("prioritySelect");

const dateInput =
    document.getElementById("dateInput");

const notesInput =
    document.getElementById("notesInput");

const linkInput =
    document.getElementById("linkInput");

const addTaskButton =
    document.getElementById("addTaskButton");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");


// SAVE DATA

function saveData() {

    localStorage.setItem(
        "careerBuilderTasks",
        JSON.stringify(tasks)
    );

}


// GET ALL TASKS

function getAllTasks() {

    return Object.values(tasks).flat();

}


// UPDATE DASHBOARD

function updateDashboard() {

    const allTasks =
        getAllTasks();

    const total =
        allTasks.length;

    const completed =
        allTasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;

    const highPriority =
        allTasks.filter(
            task =>
                task.priority === "high" &&
                !task.completed
        ).length;


    let percentage = 0;

    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    document.getElementById(
        "totalTasks"
    ).textContent = total;


    document.getElementById(
        "completedTasks"
    ).textContent = completed;


    document.getElementById(
        "pendingTasks"
    ).textContent = pending;


    document.getElementById(
        "highPriorityTasks"
    ).textContent = highPriority;


    document.getElementById(
        "overallPercentage"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "overallProgress"
    ).style.width =
        percentage + "%";


    updateCategoryProgress(
        "testing",
        "testingPercentage",
        "testingProgress"
    );


    updateCategoryProgress(
        "data",
        "dataPercentage",
        "dataProgress"
    );


    updateCategoryProgress(
        "internship",
        "internshipPercentage",
        "internshipProgress"
    );

}


// CATEGORY PROGRESS

function updateCategoryProgress(
    category,
    percentageId,
    progressId
) {

    const categoryTasks =
        tasks[category];

    const total =
        categoryTasks.length;

    const completed =
        categoryTasks.filter(
            task => task.completed
        ).length;


    let percentage = 0;

    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    document.getElementById(
        percentageId
    ).textContent =
        percentage + "%";


    document.getElementById(
        progressId
    ).style.width =
        percentage + "%";

}


// OPEN CATEGORY

document
    .querySelectorAll(".open-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentCategory =
                    button.dataset.category;

                openTaskManager();

            }
        );

    });


// OPEN TASK MANAGER

function openTaskManager() {

    dashboard.style.display = "none";

    taskManager.style.display = "block";


    if (currentCategory === "testing") {

        taskTitle.textContent =
            "🧪 Manual Testing Tasks";

        taskDescription.textContent =
            "Track your Manual Testing learning and projects.";

    }

    else if (currentCategory === "data") {

        taskTitle.textContent =
            "📊 Data Analyst Tasks";

        taskDescription.textContent =
            "Track your datasets, analysis and dashboards.";

    }

    else {

        taskTitle.textContent =
            "💼 Internship Tasks";

        taskDescription.textContent =
            "Track your internship applications and career progress.";

    }


    currentFilter = "all";


    document
        .querySelectorAll(".filter-button")
        .forEach(
            button =>
                button.classList.remove("active")
        );


    document
        .querySelector('[data-filter="all"]')
        .classList.add("active");


    clearInputs();

    renderTasks();

}


// CLEAR INPUTS

function clearInputs() {

    taskInput.value = "";

    prioritySelect.value = "low";

    dateInput.value = "";

    notesInput.value = "";

    linkInput.value = "";

    editingIndex = null;

    addTaskButton.textContent =
        "+ Add Task";

}


// BACK

document
    .getElementById("backButton")
    .addEventListener(
        "click",
        () => {

            taskManager.style.display =
                "none";

            dashboard.style.display =
                "block";

            updateDashboard();

        }
    );


// ADD / UPDATE TASK

addTaskButton.addEventListener(
    "click",
    saveTask
);


taskInput.addEventListener(
    "keypress",
    event => {

        if (event.key === "Enter") {

            saveTask();

        }

    }
);


function saveTask() {

    const name =
        taskInput.value.trim();


    if (!name) {

        alert("Please enter a task.");

        return;

    }


    const taskData = {

        name: name,

        priority:
            prioritySelect.value,

        date:
            dateInput.value,

        notes:
            notesInput.value.trim(),

        link:
            linkInput.value.trim(),

        completed:
            editingIndex !== null
                ? tasks[currentCategory][editingIndex].completed
                : false

    };


    if (editingIndex !== null) {

        tasks[currentCategory][editingIndex] =
            taskData;

    }

    else {

        tasks[currentCategory].push(
            taskData
        );

    }


    saveData();

    clearInputs();

    renderTasks();

    updateDashboard();

}


// RENDER TASKS

function renderTasks() {

    taskList.innerHTML = "";


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    let filteredTasks =
        tasks[currentCategory]
            .map(
                (task, index) => ({
                    ...task,
                    originalIndex: index
                })
            );


    // FILTER

    if (currentFilter === "pending") {

        filteredTasks =
            filteredTasks.filter(
                task => !task.completed
            );

    }


    if (currentFilter === "completed") {

        filteredTasks =
            filteredTasks.filter(
                task => task.completed
            );

    }


    if (currentFilter === "high") {

        filteredTasks =
            filteredTasks.filter(
                task =>
                    task.priority === "high"
            );

    }


    // SEARCH

    if (searchText) {

        filteredTasks =
            filteredTasks.filter(
                task =>
                    task.name
                        .toLowerCase()
                        .includes(searchText)
            );

    }


    if (filteredTasks.length === 0) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    // CREATE TASK ITEMS

    filteredTasks.forEach(task => {

        const taskItem =
            document.createElement("div");


        taskItem.className =
            "task-item";


        if (task.completed) {

            taskItem.classList.add(
                "completed"
            );

        }


        // CHECKBOX

        const checkbox =
            document.createElement("input");


        checkbox.type =
            "checkbox";


        checkbox.className =
            "task-checkbox";


        checkbox.checked =
            task.completed;


        checkbox.addEventListener(
            "change",
            () => {

                tasks[currentCategory]
                    [task.originalIndex]
                    .completed =
                    checkbox.checked;


                saveData();

                renderTasks();

                updateDashboard();

            }
        );


        // CONTENT

        const content =
            document.createElement("div");


        content.className =
            "task-content";


        const name =
            document.createElement("div");


        name.className =
            "task-name";


        name.textContent =
            task.name;


        // META

        const meta =
            document.createElement("div");


        meta.className =
            "task-meta";


        const priority =
            document.createElement("span");


        priority.className =
            `priority priority-${task.priority}`;


        priority.textContent =
            task.priority
                .charAt(0)
                .toUpperCase()
            +
            task.priority.slice(1)
            +
            " Priority";


        meta.appendChild(
            priority
        );


        if (task.date) {

            const date =
                document.createElement("span");


            date.className =
                "task-date";


            date.textContent =
                "📅 " + task.date;


            meta.appendChild(
                date
            );

        }


        content.appendChild(
            name
        );

        content.appendChild(
            meta
        );


        // ACTIONS

        const actions =
            document.createElement("div");


        actions.className =
            "task-actions";


        // VIEW

        const viewButton =
            document.createElement("button");


        viewButton.className =
            "view-task";


        viewButton.textContent =
            "View";


        viewButton.addEventListener(
            "click",
            () => {

                showDetails(
                    task.originalIndex
                );

            }
        );


        // EDIT

        const editButton =
            document.createElement("button");


        editButton.className =
            "edit-task";


        editButton.textContent =
            "Edit";


        editButton.addEventListener(
            "click",
            () => {

                editTask(
                    task.originalIndex
                );

            }
        );


        // DELETE

        const deleteButton =
            document.createElement("button");


        deleteButton.className =
            "delete-task";


        deleteButton.textContent =
            "Delete";


        deleteButton.addEventListener(
            "click",
            () => {

                if (
                    confirm(
                        "Delete this task?"
                    )
                ) {

                    tasks[currentCategory]
                        .splice(
                            task.originalIndex,
                            1
                        );


                    saveData();

                    renderTasks();

                    updateDashboard();

                }

            }
        );


        actions.appendChild(
            viewButton
        );

        actions.appendChild(
            editButton
        );

        actions.appendChild(
            deleteButton
        );


        taskItem.appendChild(
            checkbox
        );

        taskItem.appendChild(
            content
        );

        taskItem.appendChild(
            actions
        );


        taskList.appendChild(
            taskItem
        );

    });

}


// EDIT TASK

function editTask(index) {

    const task =
        tasks[currentCategory][index];


    taskInput.value =
        task.name;

    prioritySelect.value =
        task.priority;

    dateInput.value =
        task.date;

    notesInput.value =
        task.notes || "";

    linkInput.value =
        task.link || "";


    editingIndex =
        index;


    addTaskButton.textContent =
        "Update Task";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// VIEW DETAILS

function showDetails(index) {

    const task =
        tasks[currentCategory][index];


    document.getElementById(
        "modalTitle"
    ).textContent =
        task.name;


    const modalDetails =
        document.getElementById(
            "modalDetails"
        );


    modalDetails.innerHTML = `

        <div class="detail-row">

            <div class="detail-label">
                Status
            </div>

            <div class="detail-value">
                ${task.completed
                    ? "✅ Completed"
                    : "⏳ Pending"}
            </div>

        </div>


        <div class="detail-row">

            <div class="detail-label">
                Priority
            </div>

            <div class="detail-value">
                ${task.priority}
            </div>

        </div>


        <div class="detail-row">

            <div class="detail-label">
                Date
            </div>

            <div class="detail-value">
                ${task.date || "No date added"}
            </div>

        </div>


        <div class="detail-row">

            <div class="detail-label">
                Notes
            </div>

            <div class="detail-value">
                ${task.notes || "No notes added"}
            </div>

        </div>


        <div class="detail-row">

            <div class="detail-label">
                Project / GitHub Link
            </div>

            <div class="detail-value">

                ${
                    task.link
                        ? `<a
                            href="${task.link}"
                            target="_blank"
                        >
                            Open Link 🔗
                        </a>`
                        : "No link added"
                }

            </div>

        </div>

    `;


    document.getElementById(
        "detailsModal"
    ).style.display =
        "flex";

}


// CLOSE MODAL

document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        () => {

            document.getElementById(
                "detailsModal"
            ).style.display =
                "none";

        }
    );


document
    .getElementById("detailsModal")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "detailsModal"
            ) {

                event.target.style.display =
                    "none";

            }

        }
    );


// FILTERS

document
    .querySelectorAll(".filter-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.filter;


                document
                    .querySelectorAll(
                        ".filter-button"
                    )
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );


                renderTasks();

            }
        );

    });


// CLEAR COMPLETED

document
    .getElementById("clearCompleted")
    .addEventListener(
        "click",
        () => {

            tasks[currentCategory] =
                tasks[currentCategory]
                    .filter(
                        task =>
                            !task.completed
                    );


            saveData();

            renderTasks();

            updateDashboard();

        }
    );


// SEARCH

searchInput.addEventListener(
    "input",
    () => {

        if (
            taskManager.style.display ===
            "block"
        ) {

            renderTasks();

        }

    }
);


// DARK MODE

const themeButton =
    document.getElementById(
        "themeButton"
    );


const savedTheme =
    localStorage.getItem(
        "careerTheme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark"
    );

    themeButton.textContent =
        "☀️";

}


themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        themeButton.textContent =
            isDark
                ? "☀️"
                : "🌙";


        localStorage.setItem(
            "careerTheme",
            isDark
                ? "dark"
                : "light"
        );

    }
);


// INITIAL LOAD

updateDashboard();