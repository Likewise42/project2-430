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

  setTimeout(()=>{
    document.querySelector('#errorAlert').style.display = 'none';
  }, 4000);

};

const renderError = function() {
  return(
    <div id="errorAlert" className="alert alert-danger" role="alert">...</div>

  );
};

const createErrorAlert = function() {
  const ErrorAlert = React.createClass({
    render: renderError,
  });

  ReactDOM.render(
    <ErrorAlert />,
    document.querySelector("#errorHere")
  );
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