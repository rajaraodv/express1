//routes
var fakeDB = require('../lib/fakeDB');

module.exports = function routes(app) {
    app.get('/',
    function(req, res) {
		debugger;
		console.log("in / req.session.count " + req.session.count);

        if (req.session.count && req.session.count > 3) {
            res.redirect('/toomany');
            return;
        }
		console.log("process.env.stickySession: " + process.env.stickySession);
        res.render('index', {
            title: 'This is the title',
            user: req.session.user || "",
            flash: req.flash('error'),
            hostAndPort: app.address().address + ":" + app.address().port,
			stickySession: process.env.stickySession ? process.env.stickySession  : "OFF"
        });
    });

    app.get('/toomany',
    function(req, res) {
        res.render('toomany');
    });

    app.post('/login', authenticate,
    function(req, res) {
	   console.log('in loggedin');
        res.render('loggedin', {
            user: req.session.user
        });
    });

    app.get('/logout',
    function(req, res) {
        res.redirect('/reset');
    });

    //helper for testing
    app.get('/reset',
    function(req, res) {
        req.session.count = 0;
        req.session.user = "";
        res.redirect('/');
    });

    app.get('/logout',
    function(req, res) {
        req.session.count = 0;
        res.redirect('/');
    });

}


//This helper function checks for user, password and count before allowing to 'restricted' /loggedin
function authenticate(req, res, next) {
	console.log('in authenticate');
    req.session.count = req.session.count || 0;
    req.session.count++;
	console.log("req.session.count " + req.session.count);
    var user = req.session.user = req.body.user || "";
    var password = req.body.password || "";
	debugger;
    if (req.session.count > 3) {
        res.redirect('/toomany');
    } else if (!fakeDB.exists(user, password)) {
		console.log('user does not exists.. ' + req.session.count);
        req.flash('error', 'Invalid User/Password. You have ' + (3 - (req.session.count - 1)) + ' tries left');
        res.redirect('/');
    } else {
		console.log('user exists! ');
		 //set user & reset error and count
        req.session.user = user;
        req.flash('error', '');
        next();
    }
}

