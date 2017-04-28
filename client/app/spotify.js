let spotifyRenderer;
let spotifyMain;
let SpotifyMainClass;

const renderSpotifyMain = function() {
  return(
    <div>
      <h1 id="getMemed"></h1>
      
      <button type="button" id="spotifyButton" className="btn btn-primary btn-lg btn-block">Click Me</button>
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

  spotifyMain = ReactDOM.render(
    <SpotifyMainClass csrf={csrf} />, document.querySelector("#mainSpotify")
  );

  if(document.querySelector("#spotifyButton")){
    document.querySelector("#spotifyButton").onclick = clickMeme;
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