
const token = localStorage.getItem('userToken');
// also confirm the role, if the role is not 'user' then redirect back to home page 

if (token === null) {
    window.location.href = ('./index.html');
}

if (localStorage.getItem('login') == true) {
    displayTimedAlert('alert-success', 'Welcome, user');
    localStorage.setItem('login', false);
}else {
    console.log('login is false')
}
