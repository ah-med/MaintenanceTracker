function toggleForms(id) {
    if (id === 'login') {
        displayElement(id, 'block');
        displayElement('signup', 'none');
    }
    if ( id === 'signup') {
        displayElement(id, 'block');
        displayElement('login', 'none');
    }
}

function displayAuthAlert(element, message) {
    displayElement(element, 'block')
    insertHTML(element, message);
}

// const baseUrl='http://localhost:8000';
const baseUrl='https://mtracka.herokuapp.com';