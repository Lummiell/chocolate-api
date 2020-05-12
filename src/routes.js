const {Router} = require('express');
const routes = Router();
const AlunoController = require('./Controllers/AlunoController')
const SorteioController = require('./Controllers/SorteioController')
const LoginController = require('./Controllers/LoginController')
const auth = require('./Middleware/Auth')
const {validate} = require('./Middleware/validator')
const {AlunoValidationRules} = require('./Validations/AlunoValidation')
const {SorteioValidationRules} = require('./Validations/SorteioValidation')

routes.get('/Alunos',AlunoController.index);
routes.get('/Alunos/:id',AlunoController.get);
routes.post('/Alunos',AlunoValidationRules(),validate, AlunoController.post);
routes.put('/Alunos/:id', AlunoController.put);
routes.delete('/Alunos/:id', AlunoController.delete);

routes.get('/Sorteios',SorteioController.index);
routes.get('/Sorteios/:id',SorteioController.get);
routes.post('/Sorteios/:id/GerarPares',SorteioController.GerarPares);
routes.post('/Sorteios/:id/InserirParticipante',SorteioController.InserirParticipante)
routes.post('/Sorteios',SorteioValidationRules(),validate, SorteioController.post);
routes.put('/Sorteios/:id', SorteioController.put);
routes.delete('/Sorteios/:id', SorteioController.delete);

routes.post('/Login/GerarToken',LoginController.GerarToken)
module.exports = routes;