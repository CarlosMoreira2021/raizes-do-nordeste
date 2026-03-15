import { Router } from 'express'
import { listarPorUnidade, movimentar } from '../controladores/estoqueControlador'
import { autenticar, autorizar } from '../middlewares/autenticacao'

const roteador = Router()

roteador.get('/unidade/:unidadeId', autenticar, listarPorUnidade)
roteador.post('/movimentar', autenticar, autorizar('ADMIN', 'GERENTE'), movimentar)

export default roteador