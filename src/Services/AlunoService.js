const Aluno = require('../Models/Aluno')

module.exports ={

    GET = async (id) =>{
        return await Aluno.findOne({_id:id})
    },
    POST = async (aluno) =>{
        return await Aluno.create(aluno)
    },
    PUT = async (id,aluno)=>{
        return await Aluno.updateOne({_id:id}, {$set:{
            Nome:aluno.Nome,
            Email:aluno.Email,
            Observacoes:aluno.Observacoes,
            Login:aluno.Login
        }})
    },
    DELETE = async (id) =>{
        return await Aluno.deleteOne({_id:id})
    },
    Paginate = async (page,limit = 2) =>{
        return await Aluno.paginate({},{page,limit})
    }

}