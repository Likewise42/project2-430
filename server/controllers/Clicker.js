const models = require('../models');
const Account = models.Account;

const clickerPage = (req, res) => {
  return res.render('clicker', {csrfToken: req.csrfToken()});
};

module.exports.clickerPage = clickerPage;