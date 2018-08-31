function toggleModal(id) {
    // get the modal element by id
    var modalClassName = document.getElementById(id).className;

    // replace based on status
    modalClassName = (modalClassName.indexOf('show') === -1) ? modalClassName.replace(" hide", " show") : 
    modalClassName.replace(" show", " hide");

    document.getElementById(id).className = modalClassName;
}

function loadTable(result) {
    stopRequestLoader('fetchReqLoader', 'req-table')
    var requests = result.data;
    var table = document.getElementById('table-body');
    
    if (requests.length === 0) {
        var noRequest = document.getElementById('no-request');
        var noRequestText = createText('No request yet');
        append(noRequest, noRequestText);
        return;
    }
    for (var i = requests.length - 1; i > -1; i--) {

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
        serial = (requests.length - serial) + 1
        append(sn, createText(serial));
        append(requestId, createText(requests[i].requestid));
        append(title, createText(requests[i].reqtitle));
        append(description, createText(requests[i].reqdetails));
        append(status, createText(requests[i].status));
        append(createdAt, createText(requests[i].createdat));
        append(lastUpdate, createText(requests[i].lastupdated));
        action.innerHTML = requests[i].actionLink;

    }
}
