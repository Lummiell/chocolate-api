const Aluno = require('../Models/Aluno')
module.exports = {
    async index(request, response) {
        const {page=1} = request.query;
        const alunos = await Aluno.paginate({},{page,limit:3});
        return response.json(alunos);
    },
    async post(request, response) {
        const {
            Nome,
            Email,
            Observacoes,
            Login
        } = request.body;
        const aluno = await Aluno.create({
            Nome,
            Email,
            Observacoes,
            Login
        })
        return response.json(aluno)
    },
    async get(request, response) {
        const aluno = await Aluno.findOne({
            _id: request.params.id
        })
        return response.json(aluno)
    },
    async put(request, response) {
        const alunoReplaced = await Aluno.findOne({
            _id: request.params.id
        })
        let aluno = '';
        if (alunoReplaced) {
            const {
                Nome = alunoReplaced.Nome, Email = alunoReplaced.Email, Observacoes = alunoReplaced.Observacoes, Login = alunoReplaced.Login
            } = request.body
            aluno = await Aluno.updateOne({
                _id: request.params.id
            }, {
                $set: {
                    Nome: Nome,
                    Email: Email,
                    Observacoes: Observacoes,
                    Login: Login
                }
            })
        }
        return response.json(aluno);
    },
    async delete(request, response) {
        const aluno = await Aluno.deleteOne({
            _id: request.params.id
        });
        return response.json(aluno);
    }

}