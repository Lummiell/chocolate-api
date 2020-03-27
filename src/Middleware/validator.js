const {
    body,
    validationResult
} = require('express-validator')

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractederrors = []
    errors.array().map(err => extractederrors.push({
        [err.param]: err.msg
    }))
    return res.status(422).json({
        errors: extractederrors
    })
}

module.exports = {
    validate
}