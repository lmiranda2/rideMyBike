module.exports = function (router, database, jwt, forge, fs, responseWrapper) {
    var authLogic = require('./logic/authentication.logic')(jwt, forge, fs, database, responseWrapper);

    router.route('/authenticate')
        .post(function (req, res) {
            var user = req.body;
            authLogic.validateUser(user, res);
        });
}