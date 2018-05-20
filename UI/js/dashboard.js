
document.getElementById('imgFile').addEventListener('change', handleFileSelect, false);

function handleFileSelect(input) {
    var files = input.target.files;
    var f = files[0];
    var reader = new FileReader();

    reader.onload = (function (theFile) {
        return function (e) {
            document.getElementById('userImg').innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="50" height="50"/>'].join('');
        };
    })(f);

    reader.readAsDataURL(f);
}


// tab navigation function
function contentTab(event, contentClass) {

    var thisElement = event.currentTarget;

    // get all this parents's child with class 'content'
    var content = thisElement.parentElement.parentElement.querySelectorAll(".content");
    for (i = 0; i < content.length; i++) {
        // hide all the elements with class content
        content[i].style.display = "none";
    }

    tablinks = thisElement.parentElement.querySelectorAll(".tablinks");
    for (i = 0; i < tablinks.length; i++) {
        // remove active class from all tab links
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // display the content of element clicked
    thisElement.parentElement.parentElement.querySelector(contentClass).style.display = "block";
    // make this tabe element active
    thisElement.className += " active";
}

// display update button on focus
function dispBtn(event, bool) {
    var update = event.currentTarget.parentElement.lastElementChild;
    if (bool) {
        update.style.display = "block";
    } else {
        update.style.display = "none";
    }
}

// side nav over lay for mobile view
function sideNavOverlay() {
   var x = document.getElementById('overlay');
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
// Reload window to dispay overlay on resize
window.onresize = function(){ 
    if (window.innerWidth >= 1100) {
        location.reload(false);
    }
}
