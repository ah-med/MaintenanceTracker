function modifyStatus(status) {
    var modifyUrl = baseUrl + '/api/v1/requests/' + requestid + '/' + status;
    // hide all buttons
    displayElement('accept', 'none')
    displayElement('reject', 'none')
    displayElement('resolve', 'none')
    fetchARequest(modifyUrl, 'PUT');
}