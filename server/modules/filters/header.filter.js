module.exports = function (router) {
    router.use(function (req, res, next) {
        res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
        next();
    });
}