let spotifyRenderer;
let spotifyMain;
let SpotifyMainClass;

let aboutRenderer;
let aboutMain;
let AboutMainClass;

const renderSpotifyMain = function() {
	return(
		<div>
			<h1 id="getMemed"></h1>

			<button type="button" id="spotifyButton" className="btn btn-primary btn-lg btn-block">Click Me</button>
		</div>
	);
};

const renderAboutMain = function() {
	return(
		<div className="well well-lg">
			<h1>About</h1>
			<p>thisw is a cookie clicker thing a ma booper that i made to show thta i can code ofr a sproject and this is filler text that i can wrrite so i see hot the page handles text. thisw is a cookie clicker thing a ma booper that i made to show thta i can code ofr a sproject and this is filler text that i can wrrite so i see hot the page handles text. thisw is a cookie clicker thing a ma booper that i made to show thta i can code ofr a sproject and this is filler text that i can wrrite so i see hot the page handles text.thisw is a cookie clicker thing a ma booper that i made to show thta i can code ofr a sproject and this is filler text that i can wrrite so i see hot the page handles text.</p>
			<address>
				<strong>Ryan Muskopf</strong><br></br>
				<a href="mailto:#">ryanjmuskopf@gmail.com</a>
			</address>
		</div>
	);
};

const clickMeme = ()=>{
	setInterval(()=>{
		document.querySelector("#getMemed").innerHTML = "CAN I USE SPOTIFY FOR MY 330 PROJECT CODY? "+document.querySelector("#getMemed").innerHTML;
		document.querySelector('#spotifyButton').scrollIntoView();
	},1);
};

const spotifySetup = function(csrf) {
	console.log("in spotify setup");

	SpotifyMainClass = React.createClass({
		render: renderSpotifyMain,
	});

	if(document.querySelector("#mainSpotify")){
		spotifyMain = ReactDOM.render(
			<SpotifyMainClass csrf={csrf} />, document.querySelector("#mainSpotify")
		);

		document.querySelector("#spotifyButton").onclick = clickMeme;
	}

	AboutMainClass = React.createClass({
		render: renderAboutMain,
	});

	if(document.querySelector("#mainAbout")){

		aboutMain = ReactDOM.render(
			<AboutMainClass csrf={csrf} />, document.querySelector("#mainAbout")
		);
	}
};

const spotifyGetToken = () =>{
	console.log("in spotify get token");

	sendAjax('GET', '/getToken', null, (result) => {
		spotifySetup(result.csrfToken);
	});
};

$(document).ready(function(){
	console.log("in spotify ready");

	spotifyGetToken();
});