function toggleDisplay(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function displayElement(el, style) {
    document.getElementById(el).style.display = style;
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
function createNode(element) {
    return document.createElement(element);
}
function createText(text) {
    return  document.createTextNode(text);
}
function append(parent, el) {
  return parent.appendChild(el);
}
function displayAuthAlert(element, message) {
    var alertElement = document.getElementById(element);

    alertElement.style.display = 'block';
    alertElement.innerHTML = message;

}
function displayTimedAlert(element, message) {
    // get the alert element
    var alertElement =  document.getElementById(element);
    
    //insert message into alert element 
    alertElement.innerHTML = '<span id="closealert" class="closealert">&times;</span>' + message;

    // remove the class hidden
    alertElement.classList.remove('hidden');
    
    // animate fade in
    setTimeout(function() {
        alertElement.classList.remove('visuallyhidden');
    }, 30); 
    
   // listens to the fade in transition, if it has happend 
   alertElement.addEventListener('transitionend', function() {
       // animate fade out
       alertElement.classList.add('visuallyhidden');
      
      // make the display: none after 5s of fadeout time
      var t = setTimeout(function() {
            alertElement.classList.add('hidden');
        }, 3000);
     
     // get the close alert
     var closeAlert = document.getElementById('closealert');
     
     // clear timeout when button is click and replace class list
     closeAlert.addEventListener('click', function() {
             clearTimeout(t);
          alertElement.classList.add('hidden', 'visuallyhidden');
     });
     
   });
}

// const baseUrl='http://localhost:8000';
const baseUrl='https://mtracka.herokuapp.com';