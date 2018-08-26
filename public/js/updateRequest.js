function requestAction(event, action) {
    toggleModal('newRequestModal');
    eventAction = action;
    if (eventAction === 'update') {
        getRequestData(event);
        insertRequestFormData();
    }else {
        clearRequestFormData();
    }
}

function getRequestData(event) {
    // get the requestid of the row clicked
    var clickId = event.path[2].cells[1].innerText;

    // get the title of the row clicked
    var clickTitle = event.path[2].cells[2].innerText;

    // get the description of the row clicked
    var clickDetails = event.path[2].cells[3].innerText;

    return info = {
        clickId, clickTitle, clickDetails
    }
}

function clearRequestFormData() {
    // clear title
    document.getElementById('title-id').value ='';
    // clear description
    document.getElementById('details-id').value = '';
}

function insertRequestFormData() {
    // update title
    document.getElementById('title-id').value = info.clickTitle;
    // update description
    document.getElementById('details-id').value = info.clickDetails;
}

function updateRequest(userData, token) {
    // initialize updateRequest URL
    var updateURL = baseUrl + '/api/v1/users/requests/' + info.clickId;
    // activalte loader with time out
    activateLoader();

    // make a fetch to create a new request
    fetchReq('PUT', updateURL);
}

function onSubmit(event) {
    handleSubmitRequest(event);
    (eventAction === 'update') ? updateRequest(userData, token) :
        createRequest(userData, token);
}

document.getElementById('createRequest').addEventListener('submit', onSubmit);
