var delimiter = "__";
var lengthParameter = "LENGTH";
var descriptionParameter = "DESCRIPTION";
var initialized = false;

function initLocalStorage(){
    if(!initialized){
        if(!isHTML5StroageSupported()){
            //TODO replace this with in page allert!
            alert("html 5 storeage is not supported");
        }else{
            initialized = true;
        }    
    }
}

function isHTML5StroageSupported() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function saveProjectToLocalStorage(project){
    initLocalStorage();
 
    localStorage.projectsList = project.description;

    localStorage[project.description+delimiter+lengthParameter] = project.tasks.length;
    localStorage[project.description+delimiter+descriptionParameter] = project.description;
    for(task in project.tasks){
        localStorage[project.description+delimiter+task] = project.tasks[task];
    }       
}
function getProjectByName(description){
    initLocalStorage();
    if(localStorage[description+delimiter+descriptionParameter]!==undefined){
        var length = localStorage[description+delimiter+lengthParameter];
        var tasks = new Array(Number(length));
        for (var i = 0 ; i < length; ++i){
            tasks[i] = localStorage[description+delimiter+i];
        }
        var result = { 
            description : localStorage[description+delimiter+descriptionParameter],
            tasks:tasks
        }
    }else{
        //TODO add exception!
        alert("not found! " + description);
    }
    alert("gPBN "+JSON.stringify(result));

    return result;
 }

function loadProjectsListFromLocalStorage(){
    initLocalStorage();
  
    var projectsList;
    if (localStorage.projectsList!==undefined){
        alert("lPLFLS "+JSON.stringify(localStorage.projectsList));
        projectsList = localStorage.projectsList.split(delimiter);
    }else{
        alert("lPLFLS undefined");
        projectsList =[];
    }
    return projectsList;
}