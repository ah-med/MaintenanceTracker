function displayTabItem(event, item) {
    var tabItems = document.getElementsByClassName("tab-item");
    var tabLinks = document.getElementsByClassName("tab-links")
    for ( var i = 0; i < tabItems.length; i++) {
        tabItems[i].className = tabItems[i].className.replace(" show", " hide");
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    event.currentTarget.className += " active";
    var clickedItem = document.getElementById(item);
    clickedItem.className = clickedItem.className.replace(" hide", " show");
}

function openModal(id) {
    //get the modal element by id
    var modalElement = document.getElementById(id);

    //display the modal element
    modalElement.className = modalElement.className.replace(" hide", " show")
}

function closeModal(id) {
    //get the modal element by id
    var modalElement = document.getElementById(id);

    //display the modal element
    modalElement.className = modalElement.className.replace(" show", " hide")

}