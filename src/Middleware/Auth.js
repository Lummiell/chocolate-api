const jwt = require('jsonwebtoken');
const Aluno = require('../Models/Aluno')

const auth = async (request, response, next) => {
    try {
        const token = request.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = Aluno.findOne({
            _id: data._id
        })
        if (!user) {
            throw new Error()
        }
        request.user = user;
        request.token = token;
        next()
    } catch (error) {
        response.status(401).send({
            error: 'Not Authorized'
        })
    }
}

module.exports = auth