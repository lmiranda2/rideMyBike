// route middleware to verify a token.
module.exports = function (router, fs, jwt, responseWrapper) {
    router.use(function (req, res, next) {

        var token = req.headers['x-access-token'];// req.body.token || req.query.token || req.headers['X-Access-Token'];

        if (token) {
            // verifies secret and checks exp
            var cert = fs.readFileSync('public.pem');  // get private key
            jwt.verify(token, cert, function (err, decoded) {

                if (err) {
                    return res.status(403).send(responseWrapper(false, '',  'Access denied.'));
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    res.setHeader('x-access-token', token);
                    next();
                }
            });

        } else {
            // if there is no token
            // return an error
            return res.status(403).send(responseWrapper(false, '',  'Access denied.'));
        }
    });
}