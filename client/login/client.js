const handleLogin = (e) => {
  e.preventDefault();

  $("#domoMessage").animate({width:'hide'},350);

  if($("user").val() == ''|| $("pass").val() == ''){
    handleError("RAWR! Username or password is empty!");
    return false;
  }

  //console.log($("input[name=_csrf]"),val());

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

const handleSignup = (e) => {
  e.preventDefault();

  $("#domoMessage").animate({width:'hide'},350);

  if($("user").val() == ''|| $("pass").val() == '' || $("#pass2").val() == ''){
    handleError("RAWR! All fields required!");
    return false;
  }

  if($("#pass").val() !== $("#pass2").val()){
    handleError("RAWR! Passwords do not match");
    return false;
  }

  console.dir($("#signupForm").serialize());

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

const renderLogin = function() {
  return(
    <div className="well">
      <h1>Login</h1>
      <form id="loginForm" 
        name="loginForm"
        onSubmit={this.handleSubmit}
        action="/login"
        method="POST"
        className="mainForm"
        >

        <div className="row">
          <label htmlFor="username">Username: </label>
          <input id="user" className="form-control" type="text" name="username" placeholder ="Username"/>
        </div>
        <div className="row">
          <label htmlFor="pass"> Password: </label>
          <input id="pass" className="form-control " type="password" name="pass" placeholder="Password"/>
        </div>

        <input type="hidden" name="_csrf" value={this.props.csrf}/>
        <input className="formSubmit btn btn-default" type="submit" value="Sign in" />

      </form>
      <a id="signupLink" href="/signup">Create an account!</a>
    </div>
  );
};

const renderSignup = function() {
  return(
    <div className="well">
      <h1>Creat an Account</h1>
      <form id="signupForm"
        name="signupForm"
        onSubmit={this.handleSubmit}
        action="/signup"
        method="POST"
        className="mainForm"
        >
        <div className="row">
          <label htmlFor="username">Username: </label>
          <input id="user" className="form-control" type="text" name="username" placeholder ="Username"/>
        </div>

        <div className="row">
          <label htmlFor="pass"> Password: </label>
          <input id="pass" className="form-control" type="password" name="pass" placeholder="Password"/>
        </div>

        <div className="row">
          <label htmlFor="pass2"> Password: </label>
          <input id="pass2" className="form-control" type="password" name="pass2" placeholder="Retype Password"/>
        </div>

        <input type="hidden" name="_csrf" value={this.props.csrf}/>
        <input className="formSubmit btn btn-default" type="submit" value="Sign in" />
      </form>

      <a id="loginLink" href="/signup">Already have an account? Sign in!</a>


    </div>

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



const createLoginWindow = function(csrf) {
  const LoginWindow = React.createClass({
    handleSubmit: handleLogin,
    render: renderLogin,

  });

  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector("#content")
  );

  signupLink.addEventListener("click", (e)=> {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
};

const createSignupWindow = function(csrf) {
  const SignupWindow = React.createClass({
    handleSubmit: handleSignup,
    render: renderSignup,
  });
  
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#content")
  );

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
};

const setup = function(csrf){
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");
  const loginLink = document.querySelector("#loginLink");
  const signupLink = document.querySelector("#signupLink");

  signupButton.addEventListener("click", (e)=> {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf);
  createErrorAlert();
};

const getToken = () =>{
  sendAjax('GET', '/getToken', null,(result)=>{
    setup(result.csrfToken);
  });
};

$(document).ready(function(){
  getToken();
});