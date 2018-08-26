function displayElement(el, style) {
    document.getElementById(el).style.display = style;
} 

function toggleDisplay(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        displayElement(id, 'block');
    } else {
        displayElement(id, 'none');
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

function insertHTML(id, newHTML) {
    document.getElementById(id).innerHTML = newHTML;
}

function logError(error) {
    console.log('Looks like there was a problem: \n', error);
}

function readResponseAsJSON(response) {
    return response.json();
}

function displayAuthAlert(element, message) {
    displayElement(element, 'block')
    insertHTML(element, message);
}

const baseUrl='http://localhost:8000';
// const baseUrl='https://mtracka.herokuapp.com';