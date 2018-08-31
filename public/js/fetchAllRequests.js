function updateAdminTable(result) {
    addActionLink(result)
    loadTable(result)
}

function fetchAllRequests(pathToResource, token) {
    fetch(pathToResource, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    })
        .then(readResponseAsJSON)
        .then(updateAdminTable)
        .catch(logError);
}

function addActionLink(result) {
    var resultData = result.data;

    resultData.forEach(element => {
        var actionLink = '<a href="./view_request.html?requestId=' + element.requestid + '\"><button class="btn-action btn-white edit-btn" onclick="">View</button></a>';
        element['actionLink'] = actionLink;
    });
}