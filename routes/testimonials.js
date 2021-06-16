var express = require('express');
const authorize = require('../middlewares/authorize');
var router = express.Router();
const Role = require('../models/role.module');
const controller = require('../controllers/testimonials.controller');
const { body, validationResult } = require('express-validator');


/* POST Testimonials. Role Administrator required */
router.post(
    '/',
    authorize(Role.Admin),
    body('name').notEmpty().withMessage('Campo name inválido'),
    body('content').notEmpty().withMessage('Campo content inválido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        else next();
    },
    controller.createTestimony
);

router.put('/:id', authorize(Role.Admin), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    else next();
   }
)

router.delete('/:id', authorize(Role.Admin), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    else next();
});

module.exports = router;
