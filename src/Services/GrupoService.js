const Grupo = require("../Models/Grupo");
//const alunoService = require("../Services/AlunoService");
module.exports = {
  async get(id) {
    return await Grupo.findOne({ _id: id });
  },
  async paginate(page, limit =2){
      return await Grupo.paginate({}, { page, limit });
  }
  ,
  async post(grupo) {
    return await Grupo.create(grupo);
  },
  async put(id, grupo) {
    return await Grupo.updateOne(
      { _id: id },
      {
        $set: {
          DataEncontro: grupo.DataEncontro,
          Titulo: grupo.Titulo,
          Descricao: grupo.Descricao,
          ValorMin: grupo.ValorMin,
          ValorMax: grupo.ValorMax,
          Participantes:grupo.Participantes
        },
      }
    );
  },
  async putPares(id, Pares) {
    return await Grupo.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          Pares,
        },
      }
    );
  },
  async delete(id) {
    return await Grupo.deleteOne({ _id: id });
  },
};
