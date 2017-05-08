"use strict";

var dogoRenderer = void 0;
var dogoForm = void 0;
var DogoFormClass = void 0;
var DogoListClass = void 0;

var handleDogo = function handleDogo(e) {
	e.preventDefault();

	$("dogoMessage").animate({ width: 'hide' }, 350);

	if ($("dogoName").val() == '' || $("dogoBreed").val() == '') {
		handleError("Bork! all fields required");
		return false;
	}

	sendAjax('POST', $("#dogoForm").attr("action"), $("#dogoForm").serialize(), function () {
		dogoRenderer.loadDogosFromServer();
	});

	return false;
};

var renderDogo = function renderDogo() {
	return React.createElement(
		"form",
		{ id: "dogoForm",
			name: "dogoForm",
			onSubmit: this.handleSubmit,
			action: "/dogoMaker",
			method: "POST",
			className: "dogoForm"
		},
		React.createElement(
			"label",
			{ htmlFor: "name" },
			"Name: "
		),
		React.createElement("input", { id: "dogoName", type: "text", name: "name", placeholder: "Dogo Name" }),
		React.createElement(
			"label",
			{ htmlFor: "breed" },
			" Breed: "
		),
		React.createElement("input", { id: "dogoBreed", type: "text", name: "breed", placeholder: "Dogo Breed" }),
		React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
		React.createElement("input", { className: " makeDogoSubmit", type: "submit", value: "Make Dogo" })
	);
};

var renderDogoList = function renderDogoList() {
	if (this.state.data.length === 0) {
		return React.createElement(
			"div",
			{ className: "dogoList" },
			React.createElement(
				"h3",
				{ className: "emptyDogo" },
				"No Dogos Yet"
			)
		);
	}

	var dogoNodes = this.state.data.map(function (dogo) {
		return React.createElement(
			"div",
			{ key: dogo._id, className: "dogo" },
			React.createElement("img", { src: "/assets/img/dogoface.jpeg", alt: "dogo face", className: "dogoFace" }),
			React.createElement(
				"h3",
				{ className: "dogoName" },
				" Name: ",
				dogo.name,
				" "
			),
			React.createElement(
				"h3",
				{ className: "dogoBreed" },
				" Breed: ",
				dogo.breed,
				" "
			)
		);
	});

	return React.createElement(
		"div",
		{ className: "dogoList" },
		dogoNodes
	);
};

var dogoSetup = function dogoSetup(csrf) {
	DogoFormClass = React.createClass({
		displayName: "DogoFormClass",

		handleSubmit: handleDogo,
		render: renderDogo
	});

	DogoListClass = React.createClass({
		displayName: "DogoListClass",

		loadDogosFromServer: function loadDogosFromServer() {
			sendAjax('GET', '/getDogos', null, function (data) {
				this.setState({ data: data.dogos });
			}.bind(this));
		},
		getInitialState: function getInitialState() {
			return { data: [] };
		},
		componentDidMount: function componentDidMount() {
			this.loadDogosFromServer();
		},
		render: renderDogoList
	});

	if (document.querySelector("#makeDogo")) {
		dogoForm = ReactDOM.render(React.createElement(DogoFormClass, { csrf: csrf }), document.querySelector("#makeDogo"));
	}

	if (document.querySelector("#dogos")) {
		dogoRenderer = ReactDOM.render(React.createElement(DogoListClass, null), document.querySelector("#dogos"));
	}
};

var dogoGetToken = function dogoGetToken() {
	sendAjax('GET', '/getToken', null, function (result) {
		dogoSetup(result.csrfToken);
	});
};

$(document).ready(function () {
	dogoGetToken();
});
"use strict";

var domoRenderer = void 0;
var domoForm = void 0;
var DomoFormClass = void 0;
var DomoListClass = void 0;

var handleDomo = function handleDomo(e) {
	e.preventDefault();

	$("domoMessage").animate({ width: 'hide' }, 350);

	if ($("domoName").val() == '' || $("domoAge").val() == '' || $("domoPower").val() == '') {
		handleError("Rawr! all fields required");
		return false;
	}

	sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
		domoRenderer.loadDomosFromServer();
	});

	return false;
};

var renderDomo = function renderDomo() {
	return React.createElement(
		"form",
		{ id: "domoForm",
			name: "domoForm",
			onSubmit: this.handleSubmit,
			action: "/maker",
			method: "POST",
			className: "domoForm"
		},
		React.createElement(
			"label",
			{ htmlFor: "name" },
			"Name: "
		),
		React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
		React.createElement(
			"label",
			{ htmlFor: "age" },
			" Age: "
		),
		React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
		React.createElement(
			"label",
			{ htmlFor: "power" },
			" Power: "
		),
		React.createElement("input", { id: "domoPower", type: "text", name: "power", placeholder: "Domo Power" }),
		React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
		React.createElement("input", { className: " makeDomoSubmit", type: "submit", value: "Make Domo" })
	);
};

var renderDomoList = function renderDomoList() {
	if (this.state.data.length === 0) {
		return React.createElement(
			"div",
			{ className: "domoList" },
			React.createElement(
				"h3",
				{ className: "emptyDomo" },
				"No Domos Yet"
			)
		);
	}

	var domoNodes = this.state.data.map(function (domo) {
		return React.createElement(
			"div",
			{ key: domo._id, className: "domo" },
			React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
			React.createElement(
				"h3",
				{ className: "domoName" },
				" Name: ",
				domo.name,
				" "
			),
			React.createElement(
				"h3",
				{ className: "domoAge" },
				" Age: ",
				domo.age,
				" "
			),
			React.createElement(
				"h3",
				{ className: "domoPower" },
				" Power: ",
				domo.power,
				" "
			)
		);
	});

	return React.createElement(
		"div",
		{ className: "domoList" },
		domoNodes
	);
};

var setup = function setup(csrf) {
	DomoFormClass = React.createClass({
		displayName: "DomoFormClass",

		handleSubmit: handleDomo,
		render: renderDomo
	});

	DomoListClass = React.createClass({
		displayName: "DomoListClass",

		loadDomosFromServer: function loadDomosFromServer() {
			sendAjax('GET', '/getDomos', null, function (data) {
				this.setState({ data: data.domos });
			}.bind(this));
		},
		getInitialState: function getInitialState() {
			return { data: [] };
		},
		componentDidMount: function componentDidMount() {
			this.loadDomosFromServer();
		},
		render: renderDomoList
	});

	if (document.querySelector("#makeDomo")) {
		domoForm = ReactDOM.render(React.createElement(DomoFormClass, { csrf: csrf }), document.querySelector("#makeDomo"));
	}

	if (document.querySelector("#domos")) {
		domoRenderer = ReactDOM.render(React.createElement(DomoListClass, null), document.querySelector("#domos"));
	}
};

var getToken = function getToken() {
	sendAjax('GET', '/getToken', null, function (result) {
		setup(result.csrfToken);
	});
};

$(document).ready(function () {
	getToken();
});
"use strict";

var storeRenderer = void 0;
var storeMain = void 0;
var StoreMainClass = void 0;

//clicker attributes:
var playerValues = {};
playerValues.money = 0;
playerValues.clicks = 0;
playerValues.autoClickers = 0;
playerValues.autoClickers10 = 0;
playerValues.autoClickers100 = 0;

var renderStoreMain = function renderStoreMain() {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"div",
			{ className: "well well-lg" },
			React.createElement(
				"h1",
				{ id: "autoClickers" },
				"Moonlings: 0"
			),
			React.createElement(
				"h4",
				null,
				"Moonlings cost 100 dollar coins each"
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto1Button", className: "btn btn-primary" },
						"Buy 1 Moonling"
					)
				),
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto10Button", className: "btn btn-primary" },
						"Buy 10 Moonlings"
					)
				),
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto100Button", className: "btn btn-primary" },
						"Buy 100 Moonlings"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto10000Button", className: "btn btn-primary" },
						"Buy 10k Autoclicker"
					)
				),
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto1000000Button", className: "btn btn-primary" },
						"Buy 1m Moonlings"
					)
				),
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto100000000Button", className: "btn btn-primary" },
						"Buy 100m Moonlings"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto10000000000Button", className: "btn btn-primary" },
						"Buy 10b Autoclicker"
					)
				),
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto1000000000000Button", className: "btn btn-primary" },
						"Buy 1t Moonlings"
					)
				),
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto100000000000000Button", className: "btn btn-primary" },
						"Buy 100t Moonlings"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto10000000000000000Button", className: "btn btn-primary" },
						"Buy 10quad Autoclicker"
					)
				),
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto1000000000000000000Button", className: "btn btn-primary" },
						"Buy 1quint Moonlings"
					)
				),
				React.createElement(
					"div",
					{ className: "col-sm-4" },
					React.createElement(
						"button",
						{ type: "button", id: "auto100000000000000000000Button", className: "btn btn-primary" },
						"Buy 100quint Moonlings"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-xs-12" },
					React.createElement(
						"button",
						{ type: "button", id: "doublerButton", className: "btn btn-primary" },
						"Buy a Doubler Machine"
					)
				)
			)
		),
		React.createElement(
			"form",
			{ id: "saveForm",
				name: "saveForm",
				onSubmit: this.handleSubmit,
				action: "/clicker",
				method: "POST",
				className: "saveForm"
			},
			React.createElement("input", { id: "playerValuesForm", type: "hidden", name: "playerValues" }),
			React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf })
		)
	);
};

var buyAutoClicker = function buyAutoClicker(toBuy) {

	var clickerCost = 100;

	if (toBuy * clickerCost > playerValues.money) {
		console.log("Not enough dollar coins. Missing " + (toBuy * clickerCost - playerValues.money));
	} else {
		playerValues.autoClickers += toBuy;
		playerValues.money -= toBuy * clickerCost;
	}

	updateValuesStore();
};

var buyDoublerMachine = function buyDoublerMachine(toBuy) {

	var clickerCost = 1000000000000000000000000;

	if (toBuy * clickerCost > playerValues.money) {
		console.log("Not enough dollar coins. Missing " + (toBuy * clickerCost - playerValues.money));
	} else {
		playerValues.autoClickers10 += toBuy;
		playerValues.money -= toBuy * clickerCost;
	}

	updateValuesStore();
};

var updateValuesStore = function updateValuesStore() {
	document.querySelector("#autoClickers").innerHTML = "Moonlings: " + playerValues.autoClickers;

	document.querySelector("#playerValuesForm").value = JSON.stringify(playerValues);

	handleSave();
};

var storeSetup = function storeSetup(csrf) {
	console.log("in store setup");

	StoreMainClass = React.createClass({
		displayName: "StoreMainClass",

		render: renderStoreMain,
		loadBaseStats: function loadBaseStats() {
			sendAjax('GET', '/getBaseStats', null, function (data) {
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
		componentDidMount: function componentDidMount() {
			this.loadBaseStats();
		}
	});

	if (document.querySelector("#mainStore")) {
		storeMain = ReactDOM.render(React.createElement(StoreMainClass, { csrf: csrf }), document.querySelector("#mainStore"));

		if (document.querySelector("#auto1Button")) {
			document.querySelector("#auto1Button").onclick = function () {
				buyAutoClicker(1);
			};
		}

		if (document.querySelector("#auto10Button")) {
			document.querySelector("#auto10Button").onclick = function () {
				buyAutoClicker(10);
			};
		}

		if (document.querySelector("#auto100Button")) {
			document.querySelector("#auto100Button").onclick = function () {
				buyAutoClicker(100);
			};
		}

		if (document.querySelector("#auto10000Button")) {
			document.querySelector("#auto10000Button").onclick = function () {
				buyAutoClicker(10000);
			};
		}

		if (document.querySelector("#auto1000000Button")) {
			document.querySelector("#auto1000000Button").onclick = function () {
				buyAutoClicker(1000000);
			};
		}

		if (document.querySelector("#auto100000000Button")) {
			document.querySelector("#auto100000000Button").onclick = function () {
				buyAutoClicker(100000000);
			};
		}

		if (document.querySelector("#auto10000000000Button")) {
			document.querySelector("#auto10000000000Button").onclick = function () {
				buyAutoClicker(10000000000);
			};
		}

		if (document.querySelector("#auto1000000000000Button")) {
			document.querySelector("#auto1000000000000Button").onclick = function () {
				buyAutoClicker(1000000000000);
			};
		}

		if (document.querySelector("#auto100000000000000Button")) {
			document.querySelector("#auto100000000000000Button").onclick = function () {
				buyAutoClicker(100000000000000);
			};
		}

		if (document.querySelector("#auto10000000000000000Button")) {
			document.querySelector("#auto10000000000000000Button").onclick = function () {
				buyAutoClicker(10000000000000000);
			};
		}

		if (document.querySelector("#auto1000000000000000000Button")) {
			document.querySelector("#auto1000000000000000000Button").onclick = function () {
				buyAutoClicker(1000000000000000000);
			};
		}

		if (document.querySelector("#auto100000000000000000000Button")) {
			document.querySelector("#auto100000000000000000000Button").onclick = function () {
				buyAutoClicker(100000000000000000000);
			};
		}

		if (document.querySelector("#doublerButton")) {
			document.querySelector("#doublerButton").onclick = function () {
				buyDoublerMachine(1);
			};
		}
	}
};

var storeGetToken = function storeGetToken() {
	console.log("in store get token");

	sendAjax('GET', '/getToken', null, function (result) {
		storeSetup(result.csrfToken);
	});
};

$(document).ready(function () {
	console.log("in store ready");

	storeGetToken();
});
"use strict";

var changeRenderer = void 0;
var changeMain = void 0;
var ChangeMainClass = void 0;

var renderChangeMain = function renderChangeMain() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "well well-lg" },
      React.createElement(
        "h1",
        null,
        "Change Password"
      ),
      React.createElement(
        "form",
        { id: "updateForm",
          name: "updateForm",
          onSubmit: this.handlePassSubmit,
          action: "/updatePass",
          method: "POST",
          className: "updateForm"
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
            { htmlFor: "cPass" },
            "Current Password: "
          ),
          React.createElement("input", { id: "cPass", className: "form-control", type: "password", name: "cPass", placeholder: "Current Password" })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "label",
            { htmlFor: "pass" },
            "New Password: "
          ),
          React.createElement("input", { id: "pass", className: "form-control", type: "password", name: "pass", placeholder: "Password" })
        ),
        React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
        React.createElement("input", { className: "btn btn-primary btn-lg", type: "submit", value: "Update Password" })
      )
    )
  );
};

var changeSetup = function changeSetup(csrf) {
  console.log("in change setup");

  ChangeMainClass = React.createClass({
    displayName: "ChangeMainClass",

    render: renderChangeMain,
    handlePassSubmit: handlePassUpdate
  });

  if (document.querySelector("#mainChange")) {
    changeMain = ReactDOM.render(React.createElement(ChangeMainClass, { csrf: csrf }), document.querySelector("#mainChange"));
  }
};

var changeGetToken = function changeGetToken() {
  console.log("in change get token");

  sendAjax('GET', '/getToken', null, function (result) {
    changeSetup(result.csrfToken);
  });
};

$(document).ready(function () {
  console.log("in change ready");

  changeGetToken();
});
"use strict";

var clickerRenderer = void 0;
var clickerMain = void 0;
var ClickerMainClass = void 0;

//clicker attributes:
var playerValues = {};
playerValues.money = 0;
playerValues.clicks = 0;
playerValues.autoClickers = 0;
playerValues.autoClickers10 = 0;
playerValues.autoClickers100 = 0;

var renderClickerMain = function renderClickerMain() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "well row" },
      React.createElement(
        "p",
        { id: "clickNumEle", className: "col-xs-3" },
        "Clicks: 0"
      ),
      React.createElement(
        "p",
        { id: "dollarCoinEle", className: "col-xs-3" },
        "Dollar Coins: 0"
      ),
      React.createElement(
        "p",
        { id: "autoClickersEle", className: "col-xs-3" },
        "Moonlings: 0"
      ),
      React.createElement(
        "p",
        { id: "doublerMachinesEle", className: "col-xs-3" },
        "Doubler Machines: 0"
      )
    ),
    React.createElement(
      "div",
      { className: "well well-lg" },
      React.createElement(
        "button",
        { type: "button", id: "mainButton", className: "btn btn-primary btn-lg btn-block" },
        "Click me!"
      )
    ),
    React.createElement(
      "form",
      { id: "saveForm",
        name: "saveForm",
        onSubmit: this.handleSubmit,
        action: "/clicker",
        method: "POST",
        className: "saveForm"
      },
      React.createElement("input", { id: "playerValuesForm", type: "hidden", name: "playerValues" }),
      React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf })
    )
  );

  //  <div className="row">
  //    <label htmlFor="pass2">New Password: </label>
  //    <input id="pass2" className="form-control" type="password" name="pass2" placeholder="Retype Password"/>
  //  </div>
};

var onMainClick = function onMainClick() {
  console.log("click");
  playerValues.clicks++;
  playerValues.money++;
  updateValues();
};

var autoClick = function autoClick() {
  playerValues.money += playerValues.autoClickers;
  playerValues.clicks += playerValues.autoClickers;

  updateValues();
  handleSave();
};

var doubleMoney = function doubleMoney() {
  playerValues.money += playerValues.money;

  console.log("in doubler");

  updateValues();
  handleSave();
};

var updateValues = function updateValues() {
  document.querySelector("#clickNumEle").innerHTML = "Clicks: " + playerValues.clicks;
  document.querySelector("#dollarCoinEle").innerHTML = "Dollar Coins: " + playerValues.money;
  document.querySelector("#autoClickersEle").innerHTML = "Moonlings: " + playerValues.autoClickers;
  document.querySelector("#doublerMachinesEle").innerHTML = "Doubler Machines: " + playerValues.autoClickers10;

  document.querySelector("#playerValuesForm").value = JSON.stringify(playerValues);
};

var handleSave = function handleSave() {
  sendAjax('POST', $("#saveForm").attr("action"), $("#saveForm").serialize(), function () {
    console.log("Save Successful!");
  });
};

var handlePassUpdate = function handlePassUpdate(e) {
  e.preventDefault();

  sendAjax('POST', $("#updateForm").attr("action"), $("#updateForm").serialize(), function () {
    console.log("Update Successful!");
  });

  return false;
};

var clickerSetup = function clickerSetup(csrf) {
  console.log("in clicker setup");

  ClickerMainClass = React.createClass({
    displayName: "ClickerMainClass",

    handleSubmit: handleSave,
    handlePassSubmit: handlePassUpdate,
    render: renderClickerMain,
    loadBaseStats: function loadBaseStats() {
      sendAjax('GET', '/getBaseStats', null, function (data) {
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
    componentDidMount: function componentDidMount() {
      this.loadBaseStats();

      setInterval(function () {
        autoClick();

        for (var i = 0; i < playerValues.autoClickers10; i++) {
          console.log("in for loop");
          doubleMoney();
        }
      }, 1000);
    }
  });

  if (document.querySelector("#mainClicker")) {
    clickerMain = ReactDOM.render(React.createElement(ClickerMainClass, { csrf: csrf }), document.querySelector("#mainClicker"));

    document.querySelector("#mainButton").onclick = onMainClick;
  }
};

var clickerGetToken = function clickerGetToken() {
  console.log("in clicker get token");

  sendAjax('GET', '/getToken', null, function (result) {
    clickerSetup(result.csrfToken);
  });
};

$(document).ready(function () {
  console.log("in clicker ready");

  clickerGetToken();
});
"use strict";

var spotifyRenderer = void 0;
var spotifyMain = void 0;
var SpotifyMainClass = void 0;

var aboutRenderer = void 0;
var aboutMain = void 0;
var AboutMainClass = void 0;

var renderSpotifyMain = function renderSpotifyMain() {
	return React.createElement(
		"div",
		null,
		React.createElement("h1", { id: "getMemed" }),
		React.createElement(
			"button",
			{ type: "button", id: "spotifyButton", className: "btn btn-primary btn-lg btn-block" },
			"Click Me"
		)
	);
};

var renderAboutMain = function renderAboutMain() {
	return React.createElement(
		"div",
		{ className: "well well-lg" },
		React.createElement(
			"h1",
			null,
			"About"
		),
		React.createElement(
			"p",
			null,
			"This cookie-clicker inspired application is an excercise in storing and retrieving data from a Mongo database using Mongoose. The story of the game is that you found a button on the moon that when clicked gives you 1 Dollar Coin",
			React.createElement(
				"sup",
				null,
				"TM"
			),
			". So you must hire Moonlings to click the button for you. Thankfully for you there are nearly infintie Moonlings, and they are all eager to work for you for a small sum of 100 Dollar Coins",
			React.createElement(
				"sup",
				null,
				"TM"
			),
			"."
		),
		React.createElement(
			"address",
			null,
			React.createElement(
				"strong",
				null,
				"Made by Ryan Muskopf"
			),
			React.createElement("br", null),
			React.createElement(
				"a",
				{ href: "mailto:#" },
				"ryanjmuskopf@gmail.com"
			)
		),
		React.createElement(
			"form",
			{ action: "https://www.paypal.com/cgi-bin/webscr", method: "post", target: "_top" },
			React.createElement("input", { type: "hidden", name: "cmd", value: "_s-xclick" }),
			React.createElement("input", { type: "hidden", name: "encrypted", value: "-----BEGIN PKCS7-----MIIHLwYJKoZIhvcNAQcEoIIHIDCCBxwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYBpCPHzALXvjv6zdPi8Tks8ZNzKov2JVNYb7clpxzuRJr+VTyCvWWiMoVYMUWWFTWTcZ9vsOigf8jdgJM6HwB8S2L0etnaMUJyuVbI8Feu9cYuv/x/tBUkQvaSuOgwCzXW/a2d7c8Rqq1sKPsl5k4uSb5BHGbmzQcyyy/z7m0ex0DELMAkGBSsOAwIaBQAwgawGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQI45Nn9QcBX5SAgYiCoYC2XQ2JKJ6BvvBzhXA+wt/qPPq91iVArb6vPnTuPqD/3Ajp004QghjMreGvlOaAT6L3kCg1kqHpWLBOwAwGWC1HCL/biYXfq/C8JlL0SvAD7GmG8dgTnvDBaG8OmOhw8e1VJ1p0A3OnOPkjm88TNmROwR1BvqFkSsTJrXcP70E9XCGb7dPWoIIDhzCCA4MwggLsoAMCAQICAQAwDQYJKoZIhvcNAQEFBQAwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMB4XDTA0MDIxMzEwMTMxNVoXDTM1MDIxMzEwMTMxNVowgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBR07d/ETMS1ycjtkpkvjXZe9k+6CieLuLsPumsJ7QC1odNz3sJiCbs2wC0nLE0uLGaEtXynIgRqIddYCHx88pb5HTXv4SZeuv0Rqq4+axW9PLAAATU8w04qqjaSXgbGLP3NmohqM6bV9kZZwZLR/klDaQGo1u9uDb9lr4Yn+rBQIDAQABo4HuMIHrMB0GA1UdDgQWBBSWn3y7xm8XvVk/UtcKG+wQ1mSUazCBuwYDVR0jBIGzMIGwgBSWn3y7xm8XvVk/UtcKG+wQ1mSUa6GBlKSBkTCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb22CAQAwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCBXzpWmoBa5e9fo6ujionW1hUhPkOBakTr3YCDjbYfvJEiv/2P+IobhOGJr85+XHhN0v4gUkEDI8r2/rNk1m0GA8HKddvTjyGw/XqXa+LSTlDYkqI8OwR8GEYj4efEtcRpRYBxV8KxAW93YDWzFGvruKnnLbDAF6VR5w/cCMn5hzGCAZowggGWAgEBMIGUMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTcwNTA4MTgyNTIyWjAjBgkqhkiG9w0BCQQxFgQUpnpbEZ8aEujKL/uqVR4OxnoNPPQwDQYJKoZIhvcNAQEBBQAEgYC/qlg050DpVzGZz6Pn9HWslJpeEpcpf2H5o1pHUxQYwCO/yE6rsHhn1vuh6wDhHM9TO03yGCLRbBnHdXcvfuEx84vVoAH+16/KxjUhx1cjfVDhiU18IsiwV+jObChHc+L8yR67xbS94L+9gEBT7lFfmF4f9evZ4d39Cv7/LX+RZg==-----END PKCS7-----\r " }),
			React.createElement("input", { type: "image", src: "https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif", name: "submit", alt: "PayPal - The safer, easier way to pay online!" }),
			React.createElement("img", { alt: "", src: "https://www.paypalobjects.com/en_US/i/scr/pixel.gif", width: "1", height: "1" })
		)
	);
};

var clickMeme = function clickMeme() {
	setInterval(function () {
		document.querySelector("#getMemed").innerHTML = "CAN I USE SPOTIFY FOR MY 330 PROJECT CODY? " + document.querySelector("#getMemed").innerHTML;
		document.querySelector('#spotifyButton').scrollIntoView();
	}, 1);
};

var spotifySetup = function spotifySetup(csrf) {
	console.log("in spotify setup");

	SpotifyMainClass = React.createClass({
		displayName: "SpotifyMainClass",

		render: renderSpotifyMain
	});

	if (document.querySelector("#mainSpotify")) {
		spotifyMain = ReactDOM.render(React.createElement(SpotifyMainClass, { csrf: csrf }), document.querySelector("#mainSpotify"));

		document.querySelector("#spotifyButton").onclick = clickMeme;
	}

	AboutMainClass = React.createClass({
		displayName: "AboutMainClass",

		render: renderAboutMain
	});

	if (document.querySelector("#mainAbout")) {

		aboutMain = ReactDOM.render(React.createElement(AboutMainClass, { csrf: csrf }), document.querySelector("#mainAbout"));
	}
};

var spotifyGetToken = function spotifyGetToken() {
	console.log("in spotify get token");

	sendAjax('GET', '/getToken', null, function (result) {
		spotifySetup(result.csrfToken);
	});
};

$(document).ready(function () {
	console.log("in spotify ready");

	spotifyGetToken();
});
'use strict';

var handleError = function handleError(message) {
  $('#errorMessage').text(message);

  if ($('#domoMessage')) {
    $('#domoMessage').animate({ width: 'toggle' }, 350);
    console.log('error');
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
