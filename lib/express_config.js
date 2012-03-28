var express = require('express');
//singleton (i.e. this is the same express obj  as in app.js)
var ejs = require('ejs')

 module.exports = function(app) {
    app.configure(function() {
        app.use(express.cookieParser());
        if (process.env.stickySession && process.env.stickySession == "ON") {
            app.use(express.session({
                secret: 'your secret here',
                key: 'jsessionid'
            }));
        } else {
            app.use(express.session({
                secret: 'your secret here'
            }));
        }
        app.set('views', __dirname + '/../views');
        app.set('view engine', 'ejs');
        app.set('view options', {
            layout: false
        });
        app.use(express.static(__dirname + '/../public'));

        app.use(express.bodyParser());


    });

    app.configure('development',
    function() {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    app.configure('production',
    function() {
        app.use(express.errorHandler());
    });
}
