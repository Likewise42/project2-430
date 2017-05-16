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
    <div>
      <div className="well well-lg">
        <h1>About</h1>
        <p>This cookie-clicker inspired application is an excercise in storing and retrieving data from a Mongo database using Mongoose. The story of the game is that you found a button on the moon that when clicked gives you 1 Dollar Coin<sup>TM</sup>. So you must hire Moonlings to click the button for you. Thankfully for you there are nearly infintie Moonlings, and they are all eager to work for you for a small sum of 100 Dollar Coins<sup>TM</sup>.</p>
        <address>
          <strong>Made by Ryan Muskopf</strong><br></br>
          <a href="mailto:#">ryanjmuskopf@gmail.com</a>
        </address>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                                                       "/>
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
          <img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </div>
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