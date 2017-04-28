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
			<p id="coinDisplay">Dollar Coins: 0</p>
			<div className="well well-lg">
				<h1 id="autoClickers">Auto Clickers: 0</h1>
				<h4>Auto Clickers cost 100 dollar coins each</h4>
				<div className="row">
					<div className="col-s-4">
						<button type="button" id="auto1Button" className="btn btn-primary">Buy 1 Autoclicker</button>
					</div>
					<div className="col-s-4">
						<button type="button" id="auto10Button" className="btn btn-primary">Buy 10 Autoclickers</button>
					</div>
					<div className="col-s-4">
						<button type="button" id="auto100Button" className="btn btn-primary">Buy 100 Autoclickers!</button>
					</div>
				</div>
				<div className="row">
					<div className="col-s-4">
						<button type="button" id="auto10000Button" className="btn btn-primary">Buy 10k Autoclicker</button>
					</div>
					<div className="col-s-4">
						<button type="button" id="auto1000000Button" className="btn btn-primary">Buy 1000k Autoclickers</button>
					</div>
					<div className="col-s-4">
						<button type="button" id="auto100000000Button" className="btn btn-primary">Buy 100000k Autoclickers!</button>
					</div>
				</div>
				<div className="row">
					<div className="col-s-4">
						<button type="button" id="auto10000000000Button" className="btn btn-primary">Buy 10000000k Autoclicker</button>
					</div>
					<div className="col-s-4">
						<button type="button" id="auto1000000000000Button" className="btn btn-primary">Buy 1000000000k Autoclickers</button>
					</div>
					<div className="col-s-4">
						<button type="button" id="auto100000000000000Button" className="btn btn-primary">Buy 100000000000k Autoclickers!</button>
					</div>
				</div>
				<div className="row">
					<div className="col-s-4">
						<button type="button" id="auto10000000000000000Button" className="btn btn-primary">Buy 10000000000000k Autoclicker</button>
					</div>
					<div className="col-s-4">
						<button type="button" id="auto1000000000000000000Button" className="btn btn-primary">Buy 1000000000000000k Autoclickers</button>
					</div>
					<div className="col-s-4">
						<button type="button" id="auto100000000000000000000Button" className="btn btn-primary">Buy 100000000000000000k Autoclickers!</button>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<button type="button" id="doublerButton" className="btn btn-primary">Buy a Doubler Machine</button>
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
		</div>
	);
};

const buyAutoClicker = (toBuy) =>{

	const clickerCost = 100;

	if((toBuy * clickerCost) > playerValues.money){
		console.log("Not enough dollar coins. Missing "+((toBuy * clickerCost) -playerValues.money));
	} else {
		playerValues.autoClickers += toBuy;
		playerValues.money -= (toBuy * clickerCost);
	}

	updateValuesStore();
};

const buyDoublerMachine = (toBuy) =>{

	const clickerCost = 1000000000000000000000000;

	if((toBuy * clickerCost) > playerValues.money){
		console.log("Not enough dollar coins. Missing "+((toBuy * clickerCost) -playerValues.money));
	} else {
		playerValues.autoClickers10 += toBuy;
		playerValues.money -= (toBuy * clickerCost);
	}

	updateValuesStore();
};

const updateValuesStore = () =>{
	document.querySelector("#coinDisplay").innerHTML = `Dollar Coins: ${playerValues.money}`;
	document.querySelector("#autoClickers").innerHTML = `Auto Clickers: ${playerValues.autoClickers}`;

	document.querySelector("#playerValuesForm").value = JSON.stringify(playerValues);

	handleSave();
};

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

				updateValuesStore();
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