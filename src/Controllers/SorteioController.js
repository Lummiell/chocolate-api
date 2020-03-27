const Sorteio = require('../Models/Sorteio')
const Aluno = require('../Models/Aluno')

module.exports = {
    async index(request, response) {

        const {page=1} = request.query;
        const sorteios = await Sorteio.paginate({},{page,limit:2});
        return response.json(sorteios);
    },
    async post(request, response) {
        const {
            CriadoEm,
            DataFinal,
            Descricao,
            ValorMin,
            ValorMax,
            Participantes,
            Criador,
            Pares
        } = request.body;
        const sorteio = await Sorteio.create({
            CriadoEm,
            DataFinal,
            Descricao,
            ValorMin,
            ValorMax,
            Participantes,
            Criador,
            Pares
        })
        return response.json(sorteio)
    },
    async get(request, response) {
        const sorteio = await Sorteio.findOne({
            _id: request.params.id
        })
        return response.json(sorteio)
    },
    async GerarPares(request, response) {
        let sorteio = await Sorteio.findOne({
            _id: request.params.id
        })

        if (sorteio) {
            if (sorteio.Participantes.length % 2 == 0) {
                if (sorteio.Pares.length == 0) {
                    let alunos = sorteio.Participantes;
                    let Chapeu = sorteio.Participantes;
                    let Pares = []

                    function Sortear() {
                        let Dest = Chapeu[Math.floor(Math.random() * (Chapeu.length))]
                        Chapeu = Chapeu.filter(item => item != Dest);
                        return Dest;
                    }

                    function Devolver(item) {
                        Chapeu.push(item);
                    }
                    alunos.forEach(aluno => {
                        let Dest = Sortear()
                        if (aluno._id == Dest._id) {
                            let DestMesmo = Dest
                            Dest = Sortear()
                            Devolver(DestMesmo)
                        }
                        Pares.push({
                            Remetente: aluno,
                            Destinatario: Dest
                        })
                    });
                    sorteio = await Sorteio.updateOne({
                        _id: sorteio._id
                    }, {
                        $set: {
                            Pares
                        }
                    })
                }
            }

        }
        return response.json(sorteio)
    },
    async put(request, response) {
        const SorteioReplaced = await Sorteio.findOne({
            _id: request.params.id
        })
        let sorteio = '';
        if (SorteioReplaced) {
            const {
                CriadoEm = SorteioReplaced.CriadoEm,
                    DataFinal = SorteioReplaced.DataFinal,
                    Descricao = SorteioReplaced.Descricao,
                    ValorMin = SorteioReplaced.ValorMin,
                    ValorMax = SorteioReplaced.ValorMax,
                    Participantes = SorteioReplaced.Participantes,
                    Criador = SorteioReplaced.Criador,
                    Pares = SorteioReplaced.Pares
            } = request.body
            sorteio = await Sorteio.updateOne({
                _id: request.params.id
            }, {
                $set: {
                    CriadoEm,
                    DataFinal,
                    Descricao,
                    ValorMin,
                    ValorMax,
                    Participantes,
                    Criador,
                    Pares
                }
            })
        }
        return response.json(sorteio);
    },
    async delete(request, response) {
        const sorteio = await Sorteio.deleteOne({
            _id: request.params.id
        });
        return response.json(sorteio);
    },
    async InserirParticipante(request, response) {
        const aluno = await Aluno.findOne({
            _id: request.body.id
        })
        var message;
        if (aluno) {
            const sorteio = await Sorteio.findOne({
                _id: request.params.id
            })
            if (!sorteio.Participantes.includes(aluno._id)) {
                let Participantes = sorteio.Participantes;
                Participantes.push(aluno);
                await Sorteio.updateOne({
                    _id: sorteio._id
                }, {
                    $set: {
                        Participantes
                    }
                })
                message = 'Aluno Cadastrado com sucesso'

            } else {

                message = 'Aluno já cadastrado'
            }
        } else {
            message = 'Aluno não encontrado';
        }
        return response.json({
            message
        })
    }

}