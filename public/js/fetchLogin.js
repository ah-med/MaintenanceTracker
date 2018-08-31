const loginUrl = baseUrl + '/api/v1/auth/login';


const login = (event) => {
    event.preventDefault();

    displayElement('loader', 'block');
    displayElement('login', 'none');
    const userData = {
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value
    };
    const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    };

    // fetch request
    fetch(loginUrl, postData)
        .then(response => response.json())
        .then((obj) => {
            // hide success alert if displayed
            displayElement('alert-success', 'none');
            if (obj.data) {
                // implement switch case to determine if user's role is admin or not
                // then use the role to load the necessary page 
                localStorage.setItem('userToken', obj.data.token); 
                localStorage.setItem('login', true);
                localStorage.setItem('role', obj.data.role);
                reDirectLogin(obj.data.role);
            } else {
                // get status 
                var status = obj.error.status;
                var errMess;
                switch (status) {
                    case 422:
                        var fields = JSON.stringify(obj.error.fields).replace(/[{}]/g, "") + '</br>';
                        errMess = obj.error.description + ' </br> ' + fields.replace(/[,]/g, ' </br> ');
                        break;
                    case 404 || 400:
                        errMess = obj.error.description;
                        break;
                    default:
                        errMess = "Oops! Something went wrong. Try again later"
                }
                // hide spinner
                displayElement('loader', 'none');

                // display login form and errror message
                toggleForms('login')

                // alert fail message/
                displayAuthAlert('login-warning', errMess);

            }
        })
        .catch(err => console.log(err));
};

document.getElementById('login').addEventListener('submit', login);