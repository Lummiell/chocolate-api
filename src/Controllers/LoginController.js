const AlunoService = require('../Services/AlunoService')
const jwt = require('jsonwebtoken');

module.exports = {
    async GerarToken(request,response){
        let auth=false,token=null;
        let {Usuario,Senha} = request.body
        const alunoRetorno = await AlunoService.GetByLogin(Usuario,Senha)
        if(alunoRetorno){
            auth= true;
            token = jwt.sign({_id:alunoRetorno._id},process.env.JWT_KEY,{expiresIn:300})
        }
        return response.send({auth,token})
    }
}