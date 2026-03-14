import { Router } from 'express'
import { registrar, login } from '../controladores/autenticacaoControlador'

const roteador = Router()

roteador.post('/registrar', registrar)
roteador.post('/login', login)

export default roteador