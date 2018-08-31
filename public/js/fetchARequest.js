function addRow(table, cell1Val, cell2Val) {
    var row = table.insertRow(),
        cell1 = row.insertCell(0),
        cell2 = row.insertCell(1);
    append(cell1, createText(cell1Val));
    append(cell2, createText(cell2Val));
}

function displayAction(status) {
    switch (status) {
        case 'new':
            displayElement('accept', 'block')
            displayElement('reject', 'block')
            break;
        case 'approve':
            displayElement('resolve', 'block')
            break;
        default:
            displayElement('accept', 'none')
            displayElement('reject', 'none')
            displayElement('resolve', 'none')
    }
}
function handleServerError(error) {
    switch (error.status) {
        case 401:
            reDirect('./index.html')
            break;
        case 404:
            reDirect('./not_found.html')
            break;
        default:
            console.log(error.status);
            displayElement('fetch-error', 'block');
            insertHTML('fetch-error', '<h3>Oops! action cannot be completed for some wierd reason, Try again later</h3>')
    }
}
function displayRequest(result) {
    stopRequestLoader('fetchReqLoader', 'request-table');
    if (result.error) {
        handleServerError(result.error);
        return;
    }
    var request = result.data;
    var table = document.getElementById('table-body');
    //clear table
    insertHTML('table-body', "")
    const { requestId, status, title, details } = request;
    addRow(table, "Request ID", requestId);
    addRow(table, "Title", title);
    addRow(table, "Description", details);
    addRow(table, "Status", status);
    displayAction(status);
}

function fetchARequest(pathToResource, method) {
    fetch(pathToResource, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    })
        .then(readResponseAsJSON)
        .then(displayRequest)
        .catch(logError);
}