let clickerRenderer;
let clickerMain;
let ClickerMainClass;

//clicker attributes:
let money = 0;
let clicks = 0;

const renderClickerMain = function() {
  return(
    <div>
      <div className="row">
        <div className="well col-xs-offset-1 col-xs-4">
          <p id="clickNumEle">Clicks: 0</p>
          <p id="dollarCoinEle">Coins: 0</p>
        </div>
        <div className="well col-xs-offset-2 col-xs-4">
          <form id="dogoForm"
            name="dogoForm"
            onSubmit={this.handleSubmit}
            action="/dogoMaker"
            method="POST"
            className="dogoForm"
            >
            <input type="hidden" name="_csrf" value={this.props.csrf}/>
            <input className="btn btn-primary btn-lg btn-block" type="submit" value="Save" />
          </form>
        </div>
      </div>
      <div className="well well-lg">
        <button type="button" id="mainButton" className="btn btn-primary btn-lg btn-block">Click me!</button>
      </div>
    </div>
  );
};

const onMainClick = () =>{
  console.log("click");
  clicks++;
  money++;

  document.querySelector("#clickNumEle").innerHTML = `Clicks: ${clicks}`;
  document.querySelector("#dollarCoinEle").innerHTML = `Coins: ${money}`;
};

const clickerSetup = function(csrf) {
  console.log("in clicker setup");

  ClickerMainClass = React.createClass({
    handleSubmit: handleDogo,
    render: renderClickerMain,
  });

  clickerMain = ReactDOM.render(
    <ClickerMainClass />, document.querySelector("#mainClicker")
  );

  document.querySelector("#mainButton").onclick = onMainClick;

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