
const requestUrl = baseUrl + '/api/v1/users/requests';

//display loader
displayElement('loader', 'block');

function updateTable(result) {
    // hide loader
    displayElement('loader', 'none')
    var requests = result.data;
    var table = document.getElementById('request-table');
    var actionLink = '<a href=""><button class="btn-action btn-white edit-btn" onclick=" ">Edit</button></a>';

    if (requests.length === 0) {
        var noRequest = document.getElementById('no-request');
        var noRequestText = createText('No request yet');
        append(noRequest, noRequestText);
        return;
    }
    console.log(requests);
    for (var i = 0; i < requests.length; i++) {

        var newRow = table.insertRow(),
            sn = newRow.insertCell(0),
            requestId = newRow.insertCell(1),
            title = newRow.insertCell(2),
            description = newRow.insertCell(3),
            status = newRow.insertCell(4),
            createdAt = newRow.insertCell(5),
            lastUpdate = newRow.insertCell(6),
            action = newRow.insertCell(7);

        var serial = i + 1;
        append(sn, createText(serial));
        append(requestId, createText(requests[i].requestid));
        append(title, createText(requests[i].reqtitle));
        append(description, createText(requests[i].reqdetails));
        append(status, createText(requests[i].status));
        append(createdAt, createText(requests[i].createdat));
        append(lastUpdate, createText(requests[i].lastupdated));
        action.innerHTML = actionLink;

    }
}

function logError(error) {
    console.log('Looks like there was a problem: \n', error);
}

function readResponseAsJSON(response) {
    return response.json();
}

function fetchRequests(pathToResource, token) {
    fetch(pathToResource, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    })
        .then(readResponseAsJSON)
        .then(updateTable)
        .catch(logError);
}

fetchRequests(requestUrl, token);