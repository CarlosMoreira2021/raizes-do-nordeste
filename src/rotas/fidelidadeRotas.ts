import { Router } from 'express'
import { buscarMeusSaldo, resgatar } from '../controladores/fidelidadeControlador'
import { autenticar } from '../middlewares/autenticacao'

const roteador = Router()

roteador.get('/meu-saldo', autenticar, buscarMeusSaldo)
roteador.post('/resgatar', autenticar, resgatar)

export default roteador