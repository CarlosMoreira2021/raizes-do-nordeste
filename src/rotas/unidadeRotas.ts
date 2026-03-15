import { Router } from 'express'
import { listar, buscarPorId, criar, atualizar } from '../controladores/unidadeControlador'
import { autenticar, autorizar } from '../middlewares/autenticacao'

const roteador = Router()

// Qualquer usuário autenticado pode listar unidades
roteador.get('/', autenticar, listar)
roteador.get('/:id', autenticar, buscarPorId)

// Só ADMIN e GERENTE podem criar e editar unidades
roteador.post('/', autenticar, autorizar('ADMIN', 'GERENTE'), criar)
roteador.patch('/:id', autenticar, autorizar('ADMIN', 'GERENTE'), atualizar)

export default roteador