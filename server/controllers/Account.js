const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'RAWR! All Fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/clicker' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({
      error: 'RAWR! All fields are required!',
    });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({
      error: 'RAWR! Passwords do not match!',
    });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/clicker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      return res.status(400).json({ error: 'An Error occurred' });
    });
  });
};

const updateValues = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;
  let playerValues = `${req.body.playerValues}`;
  console.dir(playerValues);
  playerValues = JSON.parse(playerValues);

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    const newAccount = account;

    newAccount.clicks = playerValues.clicks;
    newAccount.money = playerValues.money;
    newAccount.autoClickers = playerValues.autoClickers;
    newAccount.autoClickers10 = playerValues.autoClickers10;
    newAccount.autoClickers100 = playerValues.autoClickers100;

    const savePromise = newAccount.save();

    savePromise.then(() => res.json({
      clicks: newAccount.clicks,
      money: playerValues.money,
      autoClickers: playerValues.autoClickers,
      autoClickers10: playerValues.autoClickers10,
      autoClickers100: playerValues.autoClickers100,
    }));

    savePromise.catch((sErr) => {
      res.json(sErr);
    });

    return res.json({ redirect: '/clicker' });
  });
};

const updatePass = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const currentPassword = `${req.body.cPass}`;


  return Account.AccountModel.authenticate(username, currentPassword, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    const newAccount = account;

    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
      newAccount.password = hash;
      newAccount.salt = salt;

      const savePromise = newAccount.save();

      savePromise.then(() => res.json({
        password: newAccount.password,
      }));

      savePromise.catch((sErr) => {
        res.json(sErr);
      });

      return res.json({ redirect: '/clicker' });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

const getBaseStats = (request, response) => {
  const req = request;
  const res = response;

  const returnJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(returnJSON);

//  return Dogo.DogoModel.findByOwner(req.session.account._id, (err, docs) => {
//    if (err) {
//      console.log(err);
//      return res.status(400).json({ error: 'an Error occured' });
//    }
//
//    return res.json({ dogos: docs });
//  });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.getBaseStats = getBaseStats;
module.exports.updatePass = updatePass;
module.exports.updateValues = updateValues;
