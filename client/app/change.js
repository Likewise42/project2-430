let changeRenderer;
let changeMain;
let ChangeMainClass;

const renderChangeMain = function() {
  return(
    <div>
      <div className="well well-lg">
        <h1>Change Password</h1>

        <form id="updateForm"
          name="updateForm"
          onSubmit={this.handlePassSubmit}
          action="/updatePass"
          method="POST"
          className="updateForm"
          >

          <div className="row">
            <label htmlFor="username">Username: </label>
            <input id="user" className="form-control" type="text" name="username" placeholder ="Username"/>
          </div>

          <div className="row">
            <label htmlFor="cPass">Current Password: </label>
            <input id="cPass" className="form-control" type="password" name="cPass" placeholder="Current Password"/>
          </div>

          <div className="row">
            <label htmlFor="pass">New Password: </label>
            <input id="pass" className="form-control" type="password" name="pass" placeholder="Password"/>
          </div>

          <input type="hidden" name="_csrf" value={this.props.csrf}/>
          <input className="btn btn-primary btn-lg" type="submit" value="Update Password" />
        </form>
      </div>  
    </div>
  );
};

const changeSetup = function(csrf) {
  console.log("in change setup");

  ChangeMainClass = React.createClass({
    render: renderChangeMain,
    handlePassSubmit: handlePassUpdate,
  });

  if(document.querySelector("#mainChange")){
    changeMain = ReactDOM.render(
      <ChangeMainClass csrf={csrf} />, document.querySelector("#mainChange")
    );
  }

};

const changeGetToken = () =>{
  console.log("in change get token");

  sendAjax('GET', '/getToken', null, (result) => {
    changeSetup(result.csrfToken);
  });
};

$(document).ready(function(){
  console.log("in change ready");

  changeGetToken();
});