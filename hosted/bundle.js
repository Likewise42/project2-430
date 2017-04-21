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
