const mongoose = require('mongoose');
const paginate = require('mongoose-paginate')
const SorteioSchema = new mongoose.Schema({
    CriadoEm: Date,
    DataFinal: Date,
    Descricao: String,
    ValorMin: Number,
    ValorMax: Number,
    Participantes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Aluno'}],
    Criador: {type: mongoose.Schema.Types.ObjectId, ref: 'Aluno'},
    Pares: [{
        Remetente: {type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' },
        Destinatario: {type: mongoose.Schema.Types.ObjectId, ref: 'Aluno'},
        Entregou: {
            type: Boolean,
            default: false
        }
    }],
    
})
SorteioSchema.plugin(paginate);
module.exports = mongoose.model('Sorteio', SorteioSchema);