const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth')
let user = require('./../helpers/user_db');
let router = express.Router();

router.post('/login', auth.isLogged,function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
              err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).send({
                  err: 'Could not log in user'
                });
            }
            res.status(200).send({
                status:200
            });
        });
    })(req, res, next);
});


router.post('/signup',auth.isLogged,function(req, res, next) {
     if (user.add_user(req.body.username, req.body.email, req.body.password, req.body.name, req.body.lastname)) {
       res.send({status:200});
     } else {
       res.send({status:"error"});
     }
});

router.get('/value',auth.isAuth ,(req,res) => {
    res.send({session:req.session.passport, id:req.user.id});
});

router.get('/logout',auth.isAuth ,(req, res) => {
    req.logout();
    res.status(200).send({
        status: 'Bye!'
    });
});

module.exports = router;
