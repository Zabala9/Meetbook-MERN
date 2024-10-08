const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateRegisterInput = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Email is invalid'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 8, max: 30 })
      .withMessage('Password must be between 8 and 30 characters'),
    handleValidationErrors
  ];

module.exports = validateRegisterInput;