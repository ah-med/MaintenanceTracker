// const signupUrl = 'https://mtracka.herokuapp.com/api/v1/auth/signup';

const signupUrl = baseUrl + '/api/v1/auth/signup';

const signup = (event) => {
  event.preventDefault();

  displayElement('loader', 'block');
  displayElement('signup', 'none');
  const userData = {
    username: document.getElementById('signup-username').value,
    companyname: document.getElementById('signup-companyname').value,
    email: document.getElementById('signup-email').value,
    password: document.getElementById('signup-password').value
  };
  const postData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  };

  // fetch request
  fetch(signupUrl, postData)
    .then(response => response.json())
    .then((obj) => {
      if (obj.data) {
        // hide spinner
        displayElement('loader', 'none');

        // display login form and success message
        toggleForms('login');
        displayAuthAlert('alert-success', 'Account created, kindly login');

      } else {
        // get status 
        var status = obj.error.status;
        var errMess;
        switch (status) {
          case 422:
            var fields = JSON.stringify(obj.error.fields).replace(/[{}]/g, "") + '</br>';
            errMess = obj.error.description + ' </br> ' + fields.replace(/[,]/g, ' </br> ');
            break;
          case 409:
            errMess = obj.error.description;
            break;
          default:
            errMess = "Oops! Something went wrong. Try again later"
        }
        // hide spinner
        displayElement('loader', 'none');

        // display signup form and errror message
        toggleForms('signup')

        // alert fail message/
        displayAuthAlert('signup-warning', errMess);

      }
    })
    .catch(err => console.log(err));
};

document.getElementById('signup').addEventListener('submit', signup);
