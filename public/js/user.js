function displayTabItem(event, item) {
    var tabItems = document.getElementsByClassName("tab-item");
    var tabLinks = document.getElementsByClassName("tab-links")
    for ( var i = 0; i < tabItems.length; i++) {
        tabItems[i].className = tabItems[i].className.replace(" show", " hide");
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    event.currentTarget.className += " active";
    var clickedItem = document.getElementById(item);
    clickedItem.className = clickedItem.className.replace(" hide", " show");
}

function displayAlert(element, message) {
	  // get the alert element
      var alertElement =  document.getElementById(element);
      
      //insert message into alert element 
      alertElement.innerHTML = '<span id="closealert" class="closealert">&times;</span>' + message;

      // remove the class hidden
      alertElement.classList.remove('hidden');
      
      // animate fade in
      setTimeout(function() {
      	alertElement.classList.remove('visuallyhidden');
      }, 30); 
      
     // listens to the fade in transition, if it has happend 
	 alertElement.addEventListener('transitionend', function() {
     	// animate fade out
     	alertElement.classList.add('visuallyhidden');
        
        // make the display: none after 5s of fadeout time
        var t = setTimeout(function() {
      		alertElement.classList.add('hidden');
      	}, 3000);
       
       // get the close alert
       var closeAlert = document.getElementById('closealert');
       
       // clear timeout when button is click and replace class list
       closeAlert.addEventListener('click', function() {
       		clearTimeout(t);
            alertElement.classList.add('hidden', 'visuallyhidden');
       });
       
	 });
}

const requestUrl = baseUrl + '/api/v1/users/requests';

//display loader
activateLoader('fetchReqLoader', 'req-table')
fetchRequests(requestUrl, token);

function onSubmit(event) {
    handleSubmitRequest(event);
    (eventAction === 'update') ? updateRequest(userData, token) :
        createRequest(userData, token);
}

document.getElementById('createRequest').addEventListener('submit', onSubmit);