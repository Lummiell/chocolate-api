const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const SorteioSchema = new mongoose.Schema({
  CriadoEm: { type: Date, default: new Date() },
  DataEncontro: { type: Date, required: true },
  Titulo: { type: String, required: true },
  Descricao: { type: String, default: "" },
  ValorMin: { type: Number, required: true },
  ValorMax: { type: Number, required: true },
  Participantes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Aluno" }],
    default: [],
  },
  Criador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aluno",
    required: true,
  },
  Pares: {
    type: [
      {
        Remetente: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno" },
        Destinatario: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno" },
        Entregou: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  },
});
SorteioSchema.plugin(paginate);
module.exports = mongoose.model("Sorteio", SorteioSchema);
