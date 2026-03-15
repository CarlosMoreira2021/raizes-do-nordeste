import { Router } from 'express'
import { processar, buscarPorPedido } from '../controladores/pagamentoControlador'
import { autenticar } from '../middlewares/autenticacao'

const roteador = Router()

roteador.post('/processar', autenticar, processar)
roteador.get('/pedido/:pedidoId', autenticar, buscarPorPedido)

export default roteador