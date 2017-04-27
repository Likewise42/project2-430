const clickerPage = (req, res) => res.render('clicker', { csrfToken: req.csrfToken() });

module.exports.clickerPage = clickerPage;