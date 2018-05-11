// Get the modal
var createRequest = document.getElementById('requestModal');

// Get the button that opens the modal
var createBtn = document.getElementById("createBtn");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
createBtn.onclick = function() {
    createRequest.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    createRequest.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if(event.target == createRequest) {
        createRequest.style.display = "none";
    }
}