let selectedElement = null
const about_button = document.getElementById("about-button")
const projects_button = document.getElementById("projects-button")
const content_container = document.getElementById("content-container")
const content_title = document.getElementById("content-title")
const content = document.getElementById("content")
const body = document.body

function IsClosing(srcElement) {
    if (selectedElement == srcElement){
        return true
    }
    return false
}

function LoadContent(json) {
    content_title.innerHTML = json.content_title
    content.innerHTML = json.content
}

function NavButtonPressed(mouseEvent) {
    lastSelectionState = selectedElement

    if (IsClosing(mouseEvent.srcElement)){
        selectedElement.classList.remove("selected")
        selectedElement = null
    } else {
        if (lastSelectionState){
            lastSelectionState.classList.remove("selected")
        }
        selectedElement = mouseEvent.srcElement
        selectedElement.classList.add("selected")
    }

    if (lastSelectionState == null && selectedElement != null){ // Open main screen
        body.classList.remove("content-close")
        body.classList.add("content-open")
        content_container.style.display = "block"

    } else if (lastSelectionState != null && selectedElement == null) { // Close main screen
        body.classList.remove("content-open")
        body.classList.add("content-close")
        content_container.style.display = "none"
    }

    if (selectedElement) {
        switch (selectedElement.id) {
            case "about-button":
                fetch("./assets/about_me.json")
                    .then(response => response.json())
                    .then((json) => LoadContent(json));
                break;

            case "projects-button":
                fetch("./assets/projects.json")
                    .then(response => response.json())
                    .then((json) => LoadContent(json));
                break;
        
            default:
                content_title.innerHTML = "Content unavailable"
                content.innerHTML = "The selected topic does not exist"
                break;
        }
    }
}

about_button.onclick = NavButtonPressed
projects_button.onclick = NavButtonPressed