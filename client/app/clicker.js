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
				<p id="clickNumEle" className="col-xs-3">Clicks: 0</p>
				<p id="dollarCoinEle" className="col-xs-3">Dollar Coins: 0</p>
				<p id="autoClickersEle" className="col-xs-3">Moonlings: 0</p>
				<p id="doublerMachinesEle" className="col-xs-3">Doubler Machines: 0</p>

			</div>

			<div className="well well-lg">
				<button type="button" id="mainButton" className="btn btn-primary btn-lg btn-block">Click me!</button>
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

const doubleMoney = () =>{
	playerValues.money += playerValues.money;

	console.log("in doubler");

	updateValues();
	handleSave();
};

const updateValues = () =>{
	document.querySelector("#clickNumEle").innerHTML = `Clicks: ${playerValues.clicks}`;
	document.querySelector("#dollarCoinEle").innerHTML = `Dollar Coins: ${playerValues.money}`;
	document.querySelector("#autoClickersEle").innerHTML = `Moonlings: ${playerValues.autoClickers}`;
	document.querySelector("#doublerMachinesEle").innerHTML = `Doubler Machines: ${playerValues.autoClickers10}`;

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

				for(let i = 0; i<playerValues.autoClickers10; i++){
					console.log("in for loop");
					doubleMoney();
				}

			},1000);
		}
	});

	if(document.querySelector("#mainClicker")){
		clickerMain = ReactDOM.render(
			<ClickerMainClass csrf={csrf} />, document.querySelector("#mainClicker")
		);

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