const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  // app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  // app.get('/getDogos', mid.requiresLogin, controllers.Dogo.getDogos);
  app.get('/getBaseStats', mid.requiresLogin, controllers.Account.getBaseStats);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  // app.get('/dogoMaker', mid.requiresLogin, controllers.Dogo.makerPage);
  // app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  // app.post('/dogoMaker', mid.requiresLogin, controllers.Dogo.make);
  // app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.get('/clicker', mid.requiresLogin, controllers.Clicker.clickerPage);
  app.post('/clicker', mid.requiresLogin, controllers.Account.updateValues);
  app.get('/store', mid.requiresLogin, controllers.Store.storePage);
  app.get('/change', mid.requiresLogin, controllers.Change.changePage);
  app.get('/about', mid.requiresLogin, controllers.Spotify.spotifyPage);
  app.post('/updatePass', mid.requiresLogin, controllers.Account.updatePass);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
