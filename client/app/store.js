let storeRenderer;
let storeMain;
let StoreMainClass;

//clicker attributes:
let playerValues = {};
playerValues.money = 0;
playerValues.clicks = 0;
playerValues.autoClickers = 0;
playerValues.autoClickers10 = 0;
playerValues.autoClickers100 = 0;

const renderStoreMain = function() {
  return(
    <div>
      <div id="stardustWell" className="well auto">
        Stardust: 0
      </div>
      <div className="well well-lg">
        <h1 id="autoClickers">Moonlings: 0</h1>
        <h4>Moonlings cost 100 dollar coins each</h4>
        <div className="row">
          <div className="col-sm-4">
            <button type="button" id="auto1Button" className="btn btn-primary">Buy 1 Moonling</button>
          </div>
          <div className="col-sm-4">
            <button type="button" id="auto10Button" className="btn btn-primary auto">Buy 10 Moonlings</button>
          </div>
          <div className="col-sm-4">
            <button type="button" id="auto100Button" className="btn btn-primary auto">Buy 100 Moonlings</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <button type="button" id="auto10000Button" className="btn btn-primary auto">Buy 10k Autoclicker</button>
          </div>
          <div className="col-sm-4">
            <button type="button" id="auto1000000Button" className="btn btn-primary auto">Buy 1m Moonlings</button>
          </div>
          <div className="col-sm-4">
            <button type="button" id="auto100000000Button" className="btn btn-primary auto">Buy 100m Moonlings</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <button type="button" id="auto10000000000Button" className="btn btn-primary auto">Buy 10b Autoclicker</button>
          </div>
          <div className="col-sm-4">
            <button type="button" id="auto1000000000000Button" className="btn btn-primary auto">Buy 1t Moonlings</button>
          </div>
          <div className="col-sm-4">
            <button type="button" id="auto100000000000000Button" className="btn btn-primary auto">Buy 100t Moonlings</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <button type="button" id="auto10000000000000000Button" className="btn btn-primary auto">Buy 10quad Autoclicker</button>
          </div>
          <div className="col-sm-4">
            <button type="button" id="auto1000000000000000000Button" className="btn btn-primary auto">Buy 1quint Moonlings</button>
          </div>
          <div className="col-sm-4">
            <button type="button" id="auto100000000000000000000Button" className="btn btn-primary auto">Buy 100quint Moonlings</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button type="button" id="doublerButton" className="btn btn-primary auto">Buy a Doubler Machine</button>
          </div>
        </div>
        <div id="stardustMenu" className="row auto">
          <div className="col-xs-12">
            <p>Warning! Buying Stardust requires Infinite Dollar Coins and all of your Moonlings and Doubler Machines!</p>
            <button type="button" id="stardustButton" className="btn btn-primary">Buy Stardust</button>
          </div>
        </div>
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
      <div className="well well-lg">
        <button type="button" id="infButton" className="btn btn-primary btn-lg btn-block">Get Max Dollar Coin (Debug)</button>
      </div>
    </div>
  );
};

const checkButtonDisplay = () => {
  if(playerValues.autoClickers >= 1){
    document.querySelector('#auto10Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 10){
    document.querySelector('#auto100Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 100){
    document.querySelector('#auto10000Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 10000){
    document.querySelector('#auto1000000Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 1000000){
    document.querySelector('#auto100000000Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 100000000){
    document.querySelector('#auto10000000000Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 10000000000){
    document.querySelector('#auto1000000000000Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 1000000000000){
    document.querySelector('#auto100000000000000Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 100000000000000){
    document.querySelector('#auto10000000000000000Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 10000000000000000){
    document.querySelector('#auto1000000000000000000Button').style.display = 'inline-block';
  }if(playerValues.autoClickers >= 1000000000000000000){
    document.querySelector('#auto100000000000000000000Button').style.display = 'inline-block';
  }

  //doubler
  if(playerValues.autoClickers >= 100000000000000000000){
    document.querySelector('#doublerButton').style.display = 'inline-block';
  }

  //stardust
  if(playerValues.autoClickers10 >= 1){
    document.querySelector('#stardustMenu').style.display = 'inline-block';
  }

  //stardust
  if(playerValues.autoClickers100 >= 1){
    document.querySelector('#stardustWell').style.display = 'block';
  }

}

const buyAutoClicker = (toBuy) =>{

  const clickerCost = 100;

  if((toBuy * clickerCost) > playerValues.money){
    handleError("Not enough dollar coins. Missing "+((toBuy * clickerCost) -playerValues.money)+" dollar coins.");
  } else {
    playerValues.autoClickers += toBuy;
    playerValues.money -= (toBuy * clickerCost);
  }

  updateValues();
};

const buyDoublerMachine = (toBuy) =>{

  const clickerCost = 1000000000000000000000000;

  if((toBuy * clickerCost) > playerValues.money){
    handleError("Not enough dollar coins.");
  } else {
    playerValues.autoClickers10 += toBuy;
    playerValues.money -= (toBuy * clickerCost);
  }

  updateValues();
};

const buyStardust = (toBuy) =>{

  const clickerCost = 1.6e308;

  if((toBuy * clickerCost) > playerValues.money){
    handleError("Not enough dollar coins. Missing Infinity dollar coins.");
  } else {
    playerValues.autoClickers100 += toBuy;
    playerValues.money = 0;
    playerValues.autoClickers = 0;
    playerValues.autoClickers10 = 0;

    document.querySelector('#stardustWell').style.display = 'block';

    updateValues();
    handleSave();

    location.reload();
  }

  updateValues();
};

//const updateValuesStore = () =>{
//  document.querySelector("#autoClickers").innerHTML = `Moonlings: ${playerValues.autoClickers}`;
//
//  document.querySelector("#playerValuesForm").value = JSON.stringify(playerValues);
//
//  handleSave();
//};

const storeSetup = function(csrf) {
  console.log("in store setup");

  StoreMainClass = React.createClass({
    render: renderStoreMain,
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
    }
  });


  if(document.querySelector("#mainStore")){
    storeMain = ReactDOM.render(
      <StoreMainClass csrf={csrf} />, document.querySelector("#mainStore")
    );

    if(document.querySelector("#auto1Button")){
      document.querySelector("#auto1Button").onclick = ()=>{
        buyAutoClicker(1);
      };
    }

    if(document.querySelector("#auto10Button")){
      document.querySelector("#auto10Button").onclick = ()=>{
        buyAutoClicker(10);
      };
    }

    if(document.querySelector("#auto100Button")){
      document.querySelector("#auto100Button").onclick = ()=>{
        buyAutoClicker(100);
      };
    }

    if(document.querySelector("#auto10000Button")){
      document.querySelector("#auto10000Button").onclick = ()=>{
        buyAutoClicker(10000);
      };
    }

    if(document.querySelector("#auto1000000Button")){
      document.querySelector("#auto1000000Button").onclick = ()=>{
        buyAutoClicker(1000000);
      };
    }

    if(document.querySelector("#auto100000000Button")){
      document.querySelector("#auto100000000Button").onclick = ()=>{
        buyAutoClicker(100000000);
      };
    }

    if(document.querySelector("#auto10000000000Button")){
      document.querySelector("#auto10000000000Button").onclick = ()=>{
        buyAutoClicker(10000000000);
      };
    }

    if(document.querySelector("#auto1000000000000Button")){
      document.querySelector("#auto1000000000000Button").onclick = ()=>{
        buyAutoClicker(1000000000000);
      };
    }

    if(document.querySelector("#auto100000000000000Button")){
      document.querySelector("#auto100000000000000Button").onclick = ()=>{
        buyAutoClicker(100000000000000);
      };
    }

    if(document.querySelector("#auto10000000000000000Button")){
      document.querySelector("#auto10000000000000000Button").onclick = ()=>{
        buyAutoClicker(10000000000000000);
      };
    }

    if(document.querySelector("#auto1000000000000000000Button")){
      document.querySelector("#auto1000000000000000000Button").onclick = ()=>{
        buyAutoClicker(1000000000000000000);
      };
    }

    if(document.querySelector("#auto100000000000000000000Button")){
      document.querySelector("#auto100000000000000000000Button").onclick = ()=>{
        buyAutoClicker(100000000000000000000);
      };
    }

    if(document.querySelector("#doublerButton")){
      document.querySelector("#doublerButton").onclick = ()=>{
        buyDoublerMachine(1);
      };
    }

    if(document.querySelector("#stardustButton")){
      document.querySelector("#stardustButton").onclick = ()=>{
        buyStardust(1);
      };
    }

    if(document.querySelector("#infButton")){

      document.querySelector("#infButton").onclick = onInfClick;

    }
  }
};

const storeGetToken = () =>{
  console.log("in store get token");

  sendAjax('GET', '/getToken', null, (result) => {
    storeSetup(result.csrfToken);
  });
};

$(document).ready(function(){
  console.log("in store ready");

  storeGetToken();
});