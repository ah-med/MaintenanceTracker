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

function openModal(id) {
    //get the modal element by id
    var modalElement = document.getElementById(id);

    //display the modal element
    modalElement.className = modalElement.className.replace(" hide", " show")
}

function closeModal(id) {
    //get the modal element by id
    var modalElement = document.getElementById(id);

    //hide the modal element
    modalElement.className = modalElement.className.replace(" show", " hide")

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
            console.log(alertElement.classList)
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

// var submitRequest = document.getElementById('createRequest');

// submitRequest.addEventListener('click', displayAlert('alert-success', 'Request Created Successfully'));


