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
        { id: "clickNumEle", className: "col-xs-4" },
        "Clicks: 0"
      ),
      React.createElement(
        "p",
        { id: "dollarCoinEle", className: "col-xs-4" },
        "Coins: 0"
      ),
      React.createElement(
        "p",
        { id: "autoClickersEle", className: "col-xs-4" },
        "Auto Clickers: 0"
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
      "div",
      { className: "well well-lg" },
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

var updateValues = function updateValues() {
  document.querySelector("#clickNumEle").innerHTML = "Clicks: " + playerValues.clicks;
  document.querySelector("#dollarCoinEle").innerHTML = "Coins: " + playerValues.money;
  document.querySelector("#autoClickersEle").innerHTML = "Auto Clickers: " + playerValues.autoClickers;

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
      }, 1000);
    }
  });

  clickerMain = ReactDOM.render(React.createElement(ClickerMainClass, { csrf: csrf }), document.querySelector("#mainClicker"));

  if (document.querySelector("#mainButton")) {
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

  dogoForm = ReactDOM.render(React.createElement(DogoFormClass, { csrf: csrf }), document.querySelector("#makeDogo"));

  dogoRenderer = ReactDOM.render(React.createElement(DogoListClass, null), document.querySelector("#dogos"));
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

  domoForm = ReactDOM.render(React.createElement(DomoFormClass, { csrf: csrf }), document.querySelector("#makeDomo"));

  domoRenderer = ReactDOM.render(React.createElement(DomoListClass, null), document.querySelector("#domos"));
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
      "p",
      { id: "coinDisplay" },
      "Coins: 0"
    ),
    React.createElement(
      "div",
      { className: "well well-lg" },
      React.createElement(
        "h1",
        { id: "autoClickers" },
        "Auto Clickers: 0"
      ),
      React.createElement(
        "h4",
        null,
        "Auto Clickers cost 100 coins each"
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-xs-4" },
          React.createElement(
            "button",
            { type: "button", id: "auto1Button", className: "btn btn-primary" },
            "Buy 1 Autoclicker"
          )
        ),
        React.createElement(
          "div",
          { className: "col-xs-4" },
          React.createElement(
            "button",
            { type: "button", id: "auto10Button", className: "btn btn-primary" },
            "Buy 10 Autoclickers"
          )
        ),
        React.createElement(
          "div",
          { className: "col-xs-4" },
          React.createElement(
            "button",
            { type: "button", id: "auto100Button", className: "btn btn-primary" },
            "Buy 100 Autoclickers!"
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
    console.log("Not enough coins");
  } else {
    playerValues.autoClickers += toBuy;
    playerValues.money -= toBuy * clickerCost;
  }

  updateValuesStore();
};

var updateValuesStore = function updateValuesStore() {
  document.querySelector("#coinDisplay").innerHTML = "Coins: " + playerValues.money;
  document.querySelector("#autoClickers").innerHTML = "Auto Clickers: " + playerValues.autoClickers;

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
'use strict';

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
  if ($('#domoMessage')) {
    $('#domoMessage').animate({ width: 'toggle' }, 350);
    console.log('domoHelp');
  }

  if ($('#dogoMessage')) {
    $('#dogoMessage').animate({ width: 'toggle' }, 350);
    console.log('dogoHelp');
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
