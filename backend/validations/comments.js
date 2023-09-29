const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
    check('text')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('A comment should be at least 1 character'),
    handleValidationErrors
];

module.exports = validateCommentInput;