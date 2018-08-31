function loadAllRequests() {
   var path = baseUrl + '/api/v1/requests';
   // activate loader
   activateLoader('fetchReqLoader', 'req-table')

   fetchAllRequests(path, token);

}

loadAllRequests();
