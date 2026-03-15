import { Router } from 'express'
import { criar, buscarPorId, listar, atualizarStatusPedido } from '../controladores/pedidoControlador'
import { autenticar, autorizar } from '../middlewares/autenticacao'

const roteador = Router()

roteador.post('/', autenticar, criar)
roteador.get('/', autenticar, autorizar('ADMIN', 'GERENTE', 'COZINHA', 'ATENDENTE'), listar)
roteador.get('/:id', autenticar, buscarPorId)
roteador.patch('/:id/status', autenticar, autorizar('ADMIN', 'GERENTE', 'COZINHA', 'ATENDENTE'), atualizarStatusPedido)

export default roteador