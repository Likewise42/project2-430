const storePage = (req, res) => res.render('store', { csrfToken: req.csrfToken() });

module.exports.storePage = storePage;