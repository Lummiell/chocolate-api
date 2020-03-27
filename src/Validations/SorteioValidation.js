const {
    body,
    validationResult
} = require('express-validator')

const SorteioValidationRules = () => {
    return [
    body('DataFinal').toDate().isAfter(new Date().toDateString()),
    body('ValorMin').isCurrency().isFloat({gt:0}),
    body('ValorMax').isCurrency().isFloat({gt:0})
    ]
}

module.exports = {SorteioValidationRules}