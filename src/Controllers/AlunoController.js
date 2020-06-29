const service = require("../Services/AlunoService");
const AlunoService = require("../Services/AlunoService");
module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    const alunos = await service.Paginate(page);
    return response.json(alunos);
  },
  async post(request, response) {
    const { Nome, Email, Observacoes, Login } = request.body;

    const alunoResponse = await service.post({
      Nome,
      Email,
      Observacoes,
      Login,
    });
    return response.json(alunoResponse);
  },
  async get(request, response) {
    const aluno = await service.getRestricted(request.params.id);
    return response.json(aluno);
  },
  async put(request, response) {
    const alunoReplaced = await service.get(request.params.id);
    let aluno = "";
    if (alunoReplaced) {
      const {
        Nome = alunoReplaced.Nome,
        Email = alunoReplaced.Email,
        Observacoes = alunoReplaced.Observacoes,
        Login = alunoReplaced.Login,
      } = request.body;
      aluno = await service.put(request.params.id, {
        Nome,
        Email,
        Observacoes,
        Login,
      });
    }
    return response.json(aluno);
  },
  async delete(request, response) {
    const aluno = await service.delete(request.params.id);
    return response.json(aluno);
  },
  async updateDesejos(request, response) {
    const { id } = request.params;
    let { Desejos } = request.body;
    const aluno = await AlunoService.get(id);
    const lista = aluno.Desejos;
    const listaComparacao = lista.map(item=>{
        return item.toLowerCase();
    })
    console.log("");
    if (Desejos && aluno) {
      Desejos.forEach((item) => {
        if (!listaComparacao.includes(item.toLowerCase())) {
          lista.push(item);
        }
      });
      const alunoListaReplaced = await service.updateDesejos(id, lista);
      return response.json(alunoListaReplaced);
    } else {
      return response
        .status(404)
        .json({ message: "Lista de desejos nula ou aluno inválido" });
    }
  },
};
