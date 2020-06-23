const {Router} = require('express');
const routes = Router();
const AlunoController = require('./Controllers/AlunoController')
const GrupoController = require('./Controllers/GrupoController')
const LoginController = require('./Controllers/LoginController')
const auth = require('./Middleware/Auth')
const {validate} = require('./Middleware/validator')
const {AlunoValidationRules} = require('./Validations/AlunoValidation')
const {GrupoValidationRules} = require('./Validations/GrupoValidation');
const Grupo = require('./Models/Grupo');

routes.get('/Alunos',AlunoController.index);
routes.get('/Alunos/:id',AlunoController.get);
routes.post('/Alunos',AlunoValidationRules(),validate, AlunoController.post);
routes.put('/Alunos/:id', AlunoController.put);
routes.delete('/Alunos/:id', AlunoController.delete);

routes.get('/Grupos',GrupoController.index);
routes.get('/Grupos/:id',GrupoController.get);
routes.get('/Grupos/:idgrupo/:idaluno',GrupoController.GetPar)
routes.post('/Grupos/:id/GerarPares',GrupoController.GerarPares);
routes.post('/Grupos/:id/InserirParticipante',GrupoController.InserirParticipante)
routes.post('/Grupos',GrupoValidationRules(),validate, GrupoController.post);
routes.put('/Grupos/:id', GrupoController.put);
routes.delete('/Grupos/:id', GrupoController.delete);

routes.post('/Login/GerarToken',LoginController.GerarToken)
module.exports = routes;