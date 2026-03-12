const errorHandler = ( req, res, next ) => {

    console .error (error.stack);
    const status = error.status || 500;
    res.status(status).json ({error: err.message});

    next ();
}

module.exports = errorHandler;