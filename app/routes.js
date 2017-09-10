var Card = require('./models/card');

function getCards(res) {
    Card.find(function (err, cards) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        cards.forEach(card=>card.showTableflag=false);
        res.json(cards);
    });
};

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/cards',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/cards',
        failureRedirect : '/signup', 
        failureFlash : true
    }));
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/cards', isLoggedIn, function(req, res) {
        getCards(res);
        res.render('cards.html', {
            user : req.user
        });
    });

    app.post('/cards', isLoggedIn, function (req, res) {
        Card.create({
            cardnumber : req.body.cardnumber,
            cardname : req.body.cardname,
            cardexpiry : req.body.cardexpiry
        }, function (err, card) {
            if (err)
                res.send(err);
            getCards(res);
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}