import { Router } from 'express'
import { listar, simular } from '../controladores/promocaoControlador'
import { autenticar } from '../middlewares/autenticacao'

const roteador = Router()

roteador.get('/', autenticar, listar)
roteador.post('/simular', autenticar, simular)

export default roteador