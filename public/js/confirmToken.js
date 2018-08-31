
const token = localStorage.getItem('userToken');

if (token === null) {
    window.location.href = ('./index.html');
}

if (localStorage.getItem('login') == true) {
    displayTimedAlert('alert-success', 'Welcome, user');
    localStorage.setItem('login', false);
}else {
    console.log('login is false')
}
