const changePage = (req, res) => res.render('change', { csrfToken: req.csrfToken() });

module.exports.changePage = changePage;
