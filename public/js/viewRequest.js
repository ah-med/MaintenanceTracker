// extract request id from the url
const pageQuery = window.location.search.substring(1);
const requestid = pageQuery.match(/\d+/);

if (requestid && requestid.input.match(/requestId=/gi)) {
    const fetchUrl = baseUrl + '/api/v1/requests/' + requestid[0];
    activateLoader('fetchReqLoader', 'request-table');
    fetchARequest(fetchUrl, 'GET');
} else {
    reDirect('./not_found.html')
}
