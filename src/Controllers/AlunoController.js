const service = require('../Services/AlunoService')
module.exports = {
    async index(request, response) {
        const {page=1} = request.query;
        const alunos = await service.Paginate(page);
        return response.json(alunos);
    },
    async post(request, response) {
        const {
            Nome,
            Email,
            Observacoes,
            Login
        } = request.body;
        const aluno = await service.POST({Nome,Email,Observacoes,Login})
        return response.json(aluno)
    },
    async get(request, response) {
        const aluno = await service.GET(request.params.id)
        return response.json(aluno)
    },
    async put(request, response) {
        const alunoReplaced = await service.GET(request.params.id)
        let aluno = '';
        if (alunoReplaced) {
            const {
                Nome = alunoReplaced.Nome, Email = alunoReplaced.Email, Observacoes = alunoReplaced.Observacoes, Login = alunoReplaced.Login
            } = request.body
            aluno = await service.PUT(request.params.id,{Nome,Email,Observacoes,Login})
        }
        return response.json(aluno);
    },
    async delete(request, response) {
        const aluno = await service.DELETE(request.params.id)
        return response.json(aluno);
    }


}