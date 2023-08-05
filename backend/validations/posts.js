const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validatePostInput = [
    check('text')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Post must have more than 1 character'),
    handleValidationErrors
];

module.exports = validatePostInput;