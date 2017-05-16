"use strict";

var handleLogin = function handleLogin(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("user").val() == '' || $("pass").val() == '') {
    handleError("RAWR! Username or password is empty!");
    return false;
  }

  //console.log($("input[name=_csrf]"),val());

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("user").val() == '' || $("pass").val() == '' || $("#pass2").val() == '') {
    handleError("RAWR! All fields required!");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match");
    return false;
  }

  console.dir($("#signupForm").serialize());

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

var renderLogin = function renderLogin() {
  return React.createElement(
    "div",
    { className: "well" },
    React.createElement(
      "h1",
      null,
      "Login"
    ),
    React.createElement(
      "form",
      { id: "loginForm",
        name: "loginForm",
        onSubmit: this.handleSubmit,
        action: "/login",
        method: "POST",
        className: "mainForm"
      },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "label",
          { htmlFor: "username" },
          "Username: "
        ),
        React.createElement("input", { id: "user", className: "form-control", type: "text", name: "username", placeholder: "Username" })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "label",
          { htmlFor: "pass" },
          " Password: "
        ),
        React.createElement("input", { id: "pass", className: "form-control ", type: "password", name: "pass", placeholder: "Password" })
      ),
      React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
      React.createElement("input", { className: "formSubmit btn btn-default", type: "submit", value: "Sign in" })
    ),
    React.createElement(
      "a",
      { id: "signupLink", href: "/signup" },
      "Create an account!"
    )
  );
};

var renderSignup = function renderSignup() {
  return React.createElement(
    "div",
    { className: "well" },
    React.createElement(
      "h1",
      null,
      "Creat an Account"
    ),
    React.createElement(
      "form",
      { id: "signupForm",
        name: "signupForm",
        onSubmit: this.handleSubmit,
        action: "/signup",
        method: "POST",
        className: "mainForm"
      },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "label",
          { htmlFor: "username" },
          "Username: "
        ),
        React.createElement("input", { id: "user", className: "form-control", type: "text", name: "username", placeholder: "Username" })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "label",
          { htmlFor: "pass" },
          " Password: "
        ),
        React.createElement("input", { id: "pass", className: "form-control", type: "password", name: "pass", placeholder: "Password" })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "label",
          { htmlFor: "pass2" },
          " Password: "
        ),
        React.createElement("input", { id: "pass2", className: "form-control", type: "password", name: "pass2", placeholder: "Retype Password" })
      ),
      React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
      React.createElement("input", { className: "formSubmit btn btn-default", type: "submit", value: "Sign in" })
    ),
    React.createElement(
      "a",
      { id: "loginLink", href: "/signup" },
      "Already have an account? Sign in!"
    )
  );
  //  <label htmlFor="username">Username: </label>
  //        <input id="user" type="text" name="username" placeholder ="username"/>
  //        <label htmlFor="pass"> Password: </label>
  //        <input id="pass" type="password" name="pass" placeholder="password"/>
  //        <label htmlFor="pass2"> Password: </label>
  //        <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
  //        <input type="hidden" name="_csrf" value={this.props.csrf}/>
  //        <input className="formSubmit" type="submit" value="Sign Up" />
};

var createLoginWindow = function createLoginWindow(csrf) {
  var LoginWindow = React.createClass({
    displayName: "LoginWindow",

    handleSubmit: handleLogin,
    render: renderLogin

  });

  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));

  signupLink.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
};

var createSignupWindow = function createSignupWindow(csrf) {
  var SignupWindow = React.createClass({
    displayName: "SignupWindow",

    handleSubmit: handleSignup,
    render: renderSignup
  });

  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));

  loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  var loginLink = document.querySelector("#loginLink");
  var signupLink = document.querySelector("#signupLink");

  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf);
  createErrorAlert();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
'use strict';

var handleError = function handleError(message) {
  //  $('#errorMessage').text(message);
  //	
  //  if($('#domoMessage')){
  //    $('#domoMessage').animate({width:'toggle'},350);
  //    console.log('error');
  //  }

  console.log('error: ' + message);

  document.querySelector('#errorAlert').innerHTML = message;
  document.querySelector('#errorAlert').style.display = 'inline';
  if (document.querySelector('#successHere')) {
    document.querySelector('#successAlert').style.display = 'none';
  }

  setTimeout(function () {
    document.querySelector('#errorAlert').style.display = 'none';
  }, 4000);
};

var handleSuccess = function handleSuccess(message) {
  console.log('Success: ' + message);

  document.querySelector('#successAlert').innerHTML = message;
  document.querySelector('#successAlert').style.display = 'inline';
  if (document.querySelector('#errorHere')) {
    document.querySelector('#errorAlert').style.display = 'none';
  }

  setTimeout(function () {
    document.querySelector('#successAlert').style.display = 'none';
  }, 4000);
};

var renderError = function renderError() {
  return React.createElement('div', { id: 'errorAlert', className: 'alert alert-danger', role: 'alert' });
};

var renderSuccess = function renderSuccess() {
  return React.createElement('div', { id: 'successAlert', className: 'alert alert-success', role: 'alert' });
};

var createErrorAlert = function createErrorAlert() {
  var ErrorAlert = React.createClass({
    displayName: 'ErrorAlert',

    render: renderError
  });

  if (document.querySelector('#errorHere')) {
    ReactDOM.render(React.createElement(ErrorAlert, null), document.querySelector("#errorHere"));
  }
};

var createSuccessAlert = function createSuccessAlert() {
  var SuccessAlert = React.createClass({
    displayName: 'SuccessAlert',

    render: renderSuccess
  });
  if (document.querySelector('#successHere')) {

    ReactDOM.render(React.createElement(SuccessAlert, null), document.querySelector("#successHere"));
  }
};

var redirect = function redirect(response) {
  $('#domoMessage').animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
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
    error: function error(xhr, status, _error) {
      console.log(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
