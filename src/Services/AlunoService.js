const Aluno = require('../Models/Aluno')

module.exports ={

    async GET(id) {
        return await Aluno.findOne({_id:id})
    },
    async POST(aluno){
        return await Aluno.create(aluno)
    },
    async PUT(id,aluno){
        return await Aluno.updateOne({_id:id}, {$set:{
            Nome:aluno.Nome,
            Email:aluno.Email,
            Observacoes:aluno.Observacoes,
            Login:aluno.Login
        }})
    },
    async DELETE (id) {
        return await Aluno.deleteOne({_id:id})
    },
    async Paginate(page,limit = 2){
        return await Aluno.paginate({},{page,limit})
    }

}