const spotifyPage = (req, res) => res.render('spotify', { csrfToken: req.csrfToken() });

module.exports.spotifyPage = spotifyPage;
