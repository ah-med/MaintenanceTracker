function updateTable(result) {
    addActionLink(result);
    loadTable(result)
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

function addActionLink(result) {
    var resultData = result.data;

    resultData.forEach(element => {
        var status = element.status;
        var actionLink;
        switch (status) {
            case 'approve':
                actionLink = "Request Approved"
                break;
            case 'disapprove':
                actionLink = "Request Dispproved"
                break;
            case 'resolve':
                actionLink = "Request Resolved"
                break;
            default:
                actionLink = '<button class="btn-action btn-white edit-btn" onclick="requestAction(event, \'update\')">Edit</button>';
        }
        element['actionLink'] = actionLink;
    });
}