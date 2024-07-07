function log(req, res, next){
    // Intended for any extendended logging.
    console.log('Logging...');
    next();
}
module.exports = log;