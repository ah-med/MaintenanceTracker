function toggleDisplay(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleForms(id) {
    var x = document.getElementById('login');
    var y = document.getElementById('signup');
    if (id === 'login') {
        x.style.display = "block"
        y.style.display = "none"
    }
    if ( id === 'signup') {
        x.style.display = "none"
        y.style.display = "block"
    }
}