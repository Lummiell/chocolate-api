const GrupoService = require("../Services/GrupoService");
const AlunoService = require("../Services/AlunoService");
module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    if (request.query.Participante) {
      const busca = await GrupoService.filterParticipante(
        request.query.Participante
      );
      return response.json(busca);
    }
    if (request.query.Criador) {
      const busca = await GrupoService.filterCriador(request.query.Criador);
      return response.json(busca);
    }
    if (request.query.Busca) {
      const busca = await GrupoService.filterTitulo(request.query.Busca, page);
      return response.json(busca);
    }
    const grupos = await GrupoService.paginate(page, 5);
    return response.json(grupos);
  },
  async post(request, response) {
    const {
      DataEncontro,
      Titulo,
      Descricao,
      ValorMin,
      ValorMax,
      Criador,
    } = request.body;
    const grupoResponse = await GrupoService.post({
      DataEncontro,
      Titulo,
      Descricao,
      ValorMin,
      ValorMax,
      Criador,
    });
    return response.json(grupoResponse);
  },
  async get(request, response) {
    const grupo = await GrupoService.getRestricted(request.params.id);
    return response.json(grupo);
  },
  async GetPar(request, response) {
    const { idgrupo, idaluno } = request.params;
    const grupo = await GrupoService.get(idgrupo);
    const aluno = await AlunoService.get(idaluno);
    console.log({ gp: grupo.Pares });
    if (!grupo) {
      response.status(404).json({ message: "Grupo não encontrado" });
    } else {
      if (!aluno) {
        return response.status(404).json({ message: "Aluno não cadastrado" });
      } else {
        if (!grupo.Participantes.includes(idaluno)) {
          return response
            .status(400)
            .json({ message: "Esse aluno não está nesse grupo." });
        } else {
          if (!grupo.Pares.length > 0) {
            return response
              .status(400)
              .json({ message: "Esse grupo não foi sorteado ainda." });
          } else {
            for (let i = 0; i < grupo.Pares.length; i++) {
              const item = grupo.Pares[i];

              if (item.Remetente.toString() === aluno._id.toString()) {
                let alunoDest = await AlunoService.getRestricted(
                  item.Destinatario._id
                );
                return response.json(alunoDest);
              }
            }
          }
        }
      }
    }
  },
  async GerarPares(request, response) {
    let grupo = await GrupoService.get(request.params.id);

    if (grupo) {
      if (grupo.Pares.length === 0 && grupo.Participantes.length >= 3) {
        let alunos = grupo.Participantes;
        let Chapeu = grupo.Participantes;
        let Pares = [];

        function Sortear() {
          let Dest = Chapeu[Math.floor(Math.random() * Chapeu.length)];
          Chapeu = Chapeu.filter((item) => item != Dest);
          return Dest;
        }

        function Devolver(item) {
          Chapeu.push(item);
        }
        function Sobrou(sobrado) {
          let voluntario = Math.floor(Math.random() * alunos.length);
          let newDest;
          for (let i = 0; i < pares.length; i++) {
            const item = pares[i];
            if (item.Remetente == alunos[voluntario]) {
              newDest = pares[i].Destinatario;
              pares[i].Destinatario = sobrado;
            }
          }
          return newDest;
        }
        alunos.forEach((aluno) => {
          let Dest = Sortear();
          if (aluno._id == Dest._id) {
            if (Chapeu.length === 0) {
              Dest = Sobrou(Dest);
            } else {
              let DestMesmo = Dest;
              Dest = Sortear();
              Devolver(DestMesmo);
            }
          }
          Pares.push({
            Remetente: aluno,
            Destinatario: Dest,
          });
        });

        grupo = await GrupoService.putPares(grupo.id, Pares);
      }
    }

    return response.json(grupo);
  },
  async put(request, response) {
    const GrupoReplaced = await GrupoService.get(request.params.id);
    let grupoResposta = "";
    if (GrupoReplaced) {
      const {
        DataEncontro = GrupoReplaced.DataEncontro,
        Titulo = GrupoReplaced.Titulo,
        Descricao = GrupoReplaced.Descricao,
        ValorMin = GrupoReplaced.ValorMin,
        ValorMax = GrupoReplaced.ValorMax,
        Participantes = GrupoReplaced.Participantes,
      } = request.body;
      grupoResposta = await GrupoService.put(request.params.id, {
        DataEncontro,
        Titulo,
        Descricao,
        ValorMin,
        ValorMax,
        Participantes,
      });
    }
    return response.json(grupoResposta);
  },
  async delete(request, response) {
    const grupo = await GrupoService.delete(request.params.id);
    return response.json(grupo);
  },
  async InserirParticipante(request, response) {
    const aluno = await AlunoService.get(request.body.id);
    var message;
    if (!aluno) {
      message = "Aluno não encontrado";
    } else {
      const grupo = await GrupoService.get(request.params.id);
      if (grupo.Participantes.includes(aluno._id)) {
        message = "Aluno já está no grupo";
      } else {
        if (grupo.Pares.length > 0) {
          message = "Esse grupo já foi sorteado";
        } else {
          grupo.Participantes.push(aluno);
          await GrupoService.put(grupo.id, grupo);
          message = "Aluno Cadastrado com sucesso";
        }
      }
    }
    return response.json({
      message,
    });
  },
};
