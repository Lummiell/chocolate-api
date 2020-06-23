const Grupo = require("../Models/Grupo");
const { populate } = require("../Models/Grupo");
module.exports = {
  async get(id) {
    return await Grupo.findOne({ _id: id });
  },
  async getRestricted(id){
    let retorno = await Grupo.findOne({_id:id})
    .populate('Criador','Nome _id')
    .populate('Participantes','Nome _id')
    .populate('Pares.Destinatario', 'Nome _id')
    .populate('Pares.Remetente','Nome _id').exec();
    return retorno;
    
  },
  async paginate(page, limit) {
    return await Grupo.paginate({}, { page, limit });
  },
  async filterParticipante(IDparticipante) {
    console.log({IDParticipante:IDparticipante})
    return await Grupo.find({ Participantes: IDparticipante });
  },
  async filterCriador(IDCriador) {
    return await Grupo.find({Criador:IDCriador});
  },
  async filterTitulo(titulo,page,limit=5){
    return await Grupo.paginate({Titulo: new RegExp(titulo,'i') },{page,limit});
  },
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
          Participantes: grupo.Participantes,
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
