module.exports = function (jwt, forge, fs, entities, responseWrapper) {

    var User = entities.User;

    function checkPassword(user, passwordToCheck, res) {
        if (user !== undefined && user != null) {
            var userSaltedPass = forge.pkcs5.pbkdf2(passwordToCheck, user.get("userSalt"), 200000, 16);

            var md = forge.md.sha512.create();
            md.update(userSaltedPass);

            var userPasswordForged = md.digest().toHex();

            if (user.get("userPassword") == userPasswordForged) {
                var cert = fs.readFileSync('private.key');  // get private key
                var token = jwt.sign({user: user.userLogin}, cert, {
                    expiresInMinutes: 60,	 // minutes
                    algorithm: 'RS512'
                });
                res.setHeader('x-access-token', token);
                res.json(responseWrapper(true, '', '', user));
            }
            else {
                res.json(responseWrapper(false, '', 'Authentication failed.'));
            }
        }
        else {
            res.json(responseWrapper(false, '', 'Authentication failed.'));
        }
    }

    function validateUser(user, res) {
        if (user === undefined
            || user.userLogin === undefined
            || user.userPassword === undefined) {
            return responseWrapper(false, '', 'Authentication failed.');
        }

        new User({userLogin: user.userLogin}).fetch()
            .then(function (model) {
                return checkPassword(model, user.userPassword, res);
            });
    }

    return {
        checkPassword: checkPassword,
        validateUser: validateUser
    }
};