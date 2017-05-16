const handleError = (message) =>{
  //  $('#errorMessage').text(message);
  //	
  //  if($('#domoMessage')){
  //    $('#domoMessage').animate({width:'toggle'},350);
  //    console.log('error');
  //  }

  console.log(`error: ${message}`);

  document.querySelector('#errorAlert').innerHTML = message;
  document.querySelector('#errorAlert').style.display = 'inline';
  if(document.querySelector('#successHere')){
    document.querySelector('#successAlert').style.display = 'none';
  }

  setTimeout(()=>{
    document.querySelector('#errorAlert').style.display = 'none';
  }, 4000);

};

const handleSuccess = (message) =>{
  console.log(`Success: ${message}`);

  document.querySelector('#successAlert').innerHTML = message;
  document.querySelector('#successAlert').style.display = 'inline';
  if(document.querySelector('#errorHere')){  
    document.querySelector('#errorAlert').style.display = 'none';
  }

  setTimeout(()=>{
    document.querySelector('#successAlert').style.display = 'none';
  }, 4000);

};

const renderError = function() {
  return(
    <div id="errorAlert" className="alert alert-danger" role="alert"></div>
  );
};

const renderSuccess = function() {
  return(
    <div id="successAlert" className="alert alert-success" role="alert"></div>
  );
};

const createErrorAlert = function() {
  const ErrorAlert = React.createClass({
    render: renderError,
  });

  if(document.querySelector('#errorHere')){    
    ReactDOM.render(
      <ErrorAlert />,
      document.querySelector("#errorHere")
    );
  }

};

const createSuccessAlert = function() {
  const SuccessAlert = React.createClass({
    render: renderSuccess,
  });
  if(document.querySelector('#successHere')){    

    ReactDOM.render(
      <SuccessAlert />,
      document.querySelector("#successHere")
    );
  }
};

const redirect = (response) =>{
  $('#domoMessage').animate({width:'hide'},350);
  window.location = response.redirect;
}

const sendAjax = (type, action, data, success) =>{
  console.dir(type);
  console.dir(action);
  console.dir(data);
  console.dir(success);
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};