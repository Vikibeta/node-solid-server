/*jslint node: true*/
"use strict";

var fs = require('fs');

function errorPageHandler(err, req, res, next) {
    var ldp = req.app.locals.ldp;

    // If noErrorPages is set,
    // then use built-in express default error handler
    if (ldp.noErrorPages) {
        return next(err);
    }

    // Check if error page exists
    var errorPage = ldp.errorPages + err.status.toString() + '.html';
    fs.readFile(errorPage, 'utf8', function(readErr, text) {
        if (readErr) {
            return next();
        }

        res.status(err.status);
        res.header('Content-Type', 'text/html');
        res.send(text);
    });
}

exports.handler = errorPageHandler;