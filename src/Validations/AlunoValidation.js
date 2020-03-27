const {
    body,
    validationResult
} = require('express-validator')

const AlunoValidationRules = () => {
    return [
        body('Email').isEmail(), 
        body('Nome').isAlpha()
    ]
}

module.exports = {
    AlunoValidationRules
}