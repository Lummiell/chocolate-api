const Aluno = require('../Models/Aluno')
const jwt = require('jsonwebtoken');
const secret = require('../Middleware/secret')

module.exports = {
    async GerarToken(request,response){
        let {Usuario,Senha} = request.body
        const alunoRetorno = await Aluno.findOne({Login:{Usuario,Senha}})
        const token = jwt.sign({_id:alunoRetorno._id},secret,{expiresIn:300})
        return response.send({auth:true,token:token})
    }
}