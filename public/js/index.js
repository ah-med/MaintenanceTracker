function toggleForms(id) {
    if (id === 'login') {
        displayElement(id, 'block');
        displayElement('signup', 'none');
    }
    if (id === 'signup') {
        displayElement(id, 'block');
        displayElement('login', 'none');
    }
}

function reDirectLogin(role) {
    switch (role) {
        case 'MASTER_ADMIN':
            reDirect('./master_admin.html');
            break;
        case 'ADMIN':
            reDirect('./admin.html');
            break;
        default:
            reDirect('./user.html');
    }
}