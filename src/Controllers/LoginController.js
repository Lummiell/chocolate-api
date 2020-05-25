const Aluno = require('../Models/Aluno')
const jwt = require('jsonwebtoken');

module.exports = {
    async GerarToken(request,response){
        let auth=false,token=null;
        let {Usuario,Senha} = request.body
        const alunoRetorno = await Aluno.findOne({Login:{Usuario,Senha}})
        if(alunoRetorno){
            auth= true;
            token = jwt.sign({_id:alunoRetorno._id},process.env.JWT_KEY,{expiresIn:300})
        }
        return response.send({auth,token})
    }
}