const mongoose = require('mongoose');
const paginate = require('mongoose-paginate')

const AlunoSchema = new mongoose.Schema({
    Nome:String,
    Email:String,
    Observacoes:String,
    Login:{
        Usuario:String,
        Senha:String
    }
})
AlunoSchema.plugin(paginate)

module.exports = mongoose.model('Aluno',AlunoSchema);
