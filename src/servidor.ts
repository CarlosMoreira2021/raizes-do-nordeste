import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { especificacaoSwagger } from './utilitarios/swagger'
import autenticacaoRotas from './rotas/autenticacaoRotas'
import unidadeRotas from './rotas/unidadeRotas'
import produtoRotas from './rotas/produtoRotas'
import estoqueRotas from './rotas/estoqueRotas'
import pedidoRotas from './rotas/pedidoRotas'
import pagamentoRotas from './rotas/pagamentoRotas'
import fidelidadeRotas from './rotas/fidelidadeRotas'

const aplicacao = express()

aplicacao.use(cors())
aplicacao.use(express.json())
aplicacao.use(express.urlencoded({ extended: true }))

// Swagger
aplicacao.use('/documentacao', swaggerUi.serve, swaggerUi.setup(especificacaoSwagger))

// Rotas
aplicacao.use('/auth', autenticacaoRotas)
aplicacao.use('/unidades', unidadeRotas)
aplicacao.use('/produtos', produtoRotas)
aplicacao.use('/estoque', estoqueRotas)
aplicacao.use('/pedidos', pedidoRotas)
aplicacao.use('/pagamentos', pagamentoRotas)
aplicacao.use('/fidelidade', fidelidadeRotas)

aplicacao.get('/saude', (requisicao, resposta) => {
  resposta.json({
    mensagem: 'Servidor Raízes do Nordeste funcionando!',
    horario: new Date().toISOString()
  })
})

const PORTA = process.env.PORTA || 3000

aplicacao.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`)
  console.log(`Documentação disponível em http://localhost:${PORTA}/documentacao`)
})

export default aplicacao