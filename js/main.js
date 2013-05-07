$(document).ready(function() {
    getNextProjectId.conunter = 0;
    loadExistingProjects();
    $("body").on({
        click: function() {
            console.log($("#task-template").html());
            var newTaskDescription = $(".new-task-description").val();
            $(".body").append($("#task-template").html().replace("{{description}}", newTaskDescription));
            //TODO correct name
            var storedProject = getProjectByName("Complete the task for Ruby Garage");
            if (storedProject !== undefined) {
                storedProject.tasks.push(newTaskDescription);
                saveProjectToLocalStorage(storedProject);
            } else {
                saveProjectToLocalStorage({
                    description: "Complete the task for Ruby Garage",
                    tasks: [newTaskDescription]
                });
            }
        }
    }, ".add-task-button");

    $("body").on({
        blur: function() {
            var projectDescription = $(this).val();
            alert(projectDescription);
            $(this).parent().html(projectDescription);
        }
    }, ".project-description-editable");

    $("#add-project").click(function() {
        console.log("creation of new project started");
        createNewProject();
    });
})


function loadExistingProjects() {
    var existingProjects = loadProjectsListFromLocalStorage();
    var project = getProjectByName(existingProjects[0]);
    if (project === undefined) {
        console.log("there is no existing projects!");
    } else {
        showProject(project);
    }
}

function showProject(project) {
    alert(JSON.stringify(project));
    var newProjectView = $("#project-template").html();
    newProjectView = newProjectView.replace("{{project-description}}", project.description);
    var taskBlock = "";
    for (var task in project.tasks) {
        taskBlock += $("#task-template").html().replace("{{description}}", project.tasks[task]);
    }
    newProjectView = newProjectView.replace("{{tasks-block}}", taskBlock);
    $("header").after(newProjectView);
}

function createNewProject() {
    var newProjectView = $("#project-template").html();
    var currentId = getNextProjectId();
    newProjectView = newProjectView.replace("{{project-identity}}", currentId);
    newProjectView = newProjectView.replace("{{project-description}}", "Here will be project name...");
    newProjectView = newProjectView.replace("{{tasks-block}}", "");
    $("header").after(newProjectView);
    var editProjectView = $("#edit-project-template").html();
    editProjectView = editProjectView.replace("{{content}}", $("div[data-id=" + currentId + "] .project-description").html());
    $("div[data-id=" + currentId + "] .project-description").html(editProjectView);
    $("div[data-id=" + currentId + "]").show();
    $("div[data-id=" + currentId + "] .project-description-editable").select();
}

function getNextProjectId() {
    return getNextProjectId.conunter++;
}