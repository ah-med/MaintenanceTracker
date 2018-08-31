var eventAction = '';

function handleServerError(error) {
    // get the error status
    var status = error.status;
    switch (status) {
        case 401:
        case 403:
            reDirect('./index.html');
            break;
        case 422:
            var fields = JSON.stringify(error.fields).replace(/[{}]/g, "") + '</br>';
            var errMess = error.description + ' </br> ' + fields.replace(/[,]/g, ' </br> ');
            displayAuthAlert('request-error', errMess);
            break;
        default:
            displayAuthAlert('request-error', 'Oops! Something went wrong. Try again later')
    }
}

function displaySuccessAlert(result) {
    // close modal
    toggleModal('newRequestModal')
    // display success messge
    displayAlert('alert-success', result.message);
}
function reloadRequestTable() {
    // clear request table
    document.getElementById('table-body').innerHTML = "";

    fetchRequests(requestUrl, token);
}

function loadNewRequest(result) {
    stopRequestLoader('newReqloader', 'createRequest');
    // if result contains error 
    if (result.error) {
        handleServerError(result.error);
    } else {
        displaySuccessAlert(result);
        reloadRequestTable();
    }
}

function fetchReq(method, fetchUrl) {
    fetch(fetchUrl, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(userData)
    })
        .then(readResponseAsJSON)
        .then(loadNewRequest)
        .catch(logError);
}

function createRequest(userData, token) {
    // initialize createRequest URL
    var createReqURL = baseUrl + '/api/v1/users/requests';

    // activate loader with time out
    activateLoader('newReqloader', 'createRequest');

    // make a fetch to create a new request
    fetchReq('POST', createReqURL);
}

function handleSubmitRequest(event) {
    event.preventDefault();
    return userData = {
        title: document.getElementById('title-id').value,
        details: document.getElementById('details-id').value
    }
}
