let clickerRenderer;
let clickerMain;
let ClickerMainClass;

//clicker attributes:
let playerValues = {};
playerValues.money = 0;
playerValues.clicks = 0;
playerValues.autoClickers = 0;
playerValues.autoClickers10 = 0;
playerValues.autoClickers100 = 0;

const renderClickerMain = function() {
  return(
    <div>

      <div className="well row">
        <p id="clickNumEle" className="col-xs-4">Clicks: 0</p>
        <p id="dollarCoinEle" className="col-xs-4">Coins: 0</p>
        <p id="autoClickersEle" className="col-xs-4">Auto Clickers: 0</p>
      </div>

      <div className="well well-lg">
        <button type="button" id="mainButton" className="btn btn-primary btn-lg btn-block">Click me!</button>
      </div>

      <div className="well well-lg">
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
      <form id="saveForm"
        name="saveForm"
        onSubmit={this.handleSubmit}
        action="/clicker"
        method="POST"
        className="saveForm"
        >
        <input id="playerValuesForm" type="hidden" name="playerValues"/>
        <input type="hidden" name="_csrf" value={this.props.csrf}/>
      </form>
    </div>
  );

  //  <div className="row">
  //    <label htmlFor="pass2">New Password: </label>
  //    <input id="pass2" className="form-control" type="password" name="pass2" placeholder="Retype Password"/>
  //  </div>
};

const onMainClick = () =>{
  console.log("click");
  playerValues.clicks++;
  playerValues.money++;
  updateValues();
};

const autoClick = () =>{
  playerValues.money += playerValues.autoClickers;
  playerValues.clicks += playerValues.autoClickers;
  
  updateValues();
  handleSave();
};

const updateValues = () =>{
  document.querySelector("#clickNumEle").innerHTML = `Clicks: ${playerValues.clicks}`;
  document.querySelector("#dollarCoinEle").innerHTML = `Coins: ${playerValues.money}`;
  document.querySelector("#autoClickersEle").innerHTML = `Auto Clickers: ${playerValues.autoClickers}`;

  document.querySelector("#playerValuesForm").value = JSON.stringify(playerValues);
}

const handleSave = () =>{
  sendAjax('POST', $("#saveForm").attr("action"), $("#saveForm").serialize(), function(){
    console.log("Save Successful!");
  });
};

const handlePassUpdate = (e) =>{
  e.preventDefault();

  sendAjax('POST', $("#updateForm").attr("action"), $("#updateForm").serialize(), function(){
    console.log("Update Successful!");
  });

  return false;
};

const clickerSetup = function(csrf) {
  console.log("in clicker setup");

  ClickerMainClass = React.createClass({
    handleSubmit: handleSave,
    handlePassSubmit: handlePassUpdate,
    render: renderClickerMain,
    loadBaseStats: function(){
      sendAjax('GET', '/getBaseStats', null, function(data){
        console.log("Base Stats: ");
        console.dir(data);

        playerValues.clicks = data.clicks;
        playerValues.money = data.money;
        playerValues.autoClickers = data.autoClickers;
        playerValues.autoClickers10 = data.autoClickers10;
        playerValues.autoClickers100 = data.autoClickers100;

        updateValues();
      }.bind(this));
    },
    componentDidMount: function(){
      this.loadBaseStats();

      setInterval(()=>{
        autoClick();
      },1000);
    }
  });

  clickerMain = ReactDOM.render(
    <ClickerMainClass csrf={csrf} />, document.querySelector("#mainClicker")
  );

  if(document.querySelector("#mainButton")){
    document.querySelector("#mainButton").onclick = onMainClick;
  }
};

const clickerGetToken = () =>{
  console.log("in clicker get token");

  sendAjax('GET', '/getToken', null, (result) => {
    clickerSetup(result.csrfToken);
  });
};

$(document).ready(function(){
  console.log("in clicker ready");

  clickerGetToken();
});