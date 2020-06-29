const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");

const AlunoSchema = new mongoose.Schema({
  Nome: { type: String, required: true },
  Email: { type: String, required: true },
  Observacoes: { type: String, default: "" },
  Login: {
    Usuario: { type: String, required: true },
    Senha: { type: String, required: true },
  },
  Desejos:[String]
});
AlunoSchema.plugin(paginate);

module.exports = mongoose.model("Aluno", AlunoSchema);
