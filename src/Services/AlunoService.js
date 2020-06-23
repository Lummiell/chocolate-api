const Aluno = require('../Models/Aluno')

module.exports ={

    async get(id) {
        return await Aluno.findOne({_id:id})
    },
    async getRestricted(id){
        let retorno = await Aluno.findOne({_id:id}).select('-Login')
        return retorno;
    },
    async GetByLogin(Usuario,Senha){
        return await Aluno.findOne({Login:{Usuario,Senha}})
    },
    async post(aluno){
        return await Aluno.create(aluno)
    },
    async put(id,aluno){
        return await Aluno.updateOne({_id:id}, {$set:{
            Nome:aluno.Nome,
            Email:aluno.Email,
            Observacoes:aluno.Observacoes,
            Login:aluno.Login
        }})
    },
    async delete (id) {
        return await Aluno.deleteOne({_id:id})
    },
    async Paginate(page,limit = 2){
        return await Aluno.paginate({},{page,limit})
    }

}