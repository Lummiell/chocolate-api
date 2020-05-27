const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const GrupoSchema = new mongoose.Schema({
  CriadoEm: { type: Date, default: new Date().toUTCString() },
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
GrupoSchema.plugin(paginate);
module.exports = mongoose.model("Grupo", GrupoSchema);
