const express = require('express');
const router = express.Router();
const {serializeErrors, serializeTrips} = require('./../lib/helpers');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const validator = require('express-validator').validator;

const permit = (...allowed) => {
    const isAllowed = (role, req) => {
        return allowed.indexOf(role) > -1
            || req.params.userId == req.session.key.id && allowed.indexOf('owner') > -1;
    };

    return (req, res, next) => {
        if (req.session.key && isAllowed(req.session.key.roleName, req))
            next();
        else {
            res.status(403).json({ message: "Forbidden" });
        }
    };
};

const getRouter = (passport) => {
    router.post('/login', [
        check('username')
            .not().isEmpty()
            .withMessage('Username can\'t be empty'),
        check('password')
            .not().isEmpty()
            .withMessage('Password can\'t be empty')
    ],
    (req, res, next) => {
        const errors = validationResult(req).array();

        if (errors.length) {
            res.status(400);
            return res.json(serializeErrors(errors));
        }

        passport.authenticate('local', (err, user) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: 'Something went wrong'
                });
            }
            if (!user) {
                res.status(401);
                return res.send();
            }

            req.session.key = user;
            req.user = user;

            res.json({ user: {
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id,
                username: user.username,
            } });
        })(req, res, next);
    });

    router.get('/logout', (req, res) => {
        req.user = null;
        req.session.destroy(() => {
            res.send({});
        });

    });


    router.all('/*', (req, res) => {
        res.sendStatus(404);
    });

    return router;
};

module.exports = getRouter;
