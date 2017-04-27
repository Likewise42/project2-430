// const models = require('../models');
// const Account = models.Account;

const clickerPage = (req, res) => res.render('clicker', { csrfToken: req.csrfToken() });

module.exports.clickerPage = clickerPage;
