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

