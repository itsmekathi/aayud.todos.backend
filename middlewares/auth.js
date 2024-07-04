function auth(req, res, next) {
    // Intended for Authentication.
    console.log('Authenticating...');
    next();
};

module.exports = auth;