import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import autenticacaoRotas from './rotas/autenticacaoRotas'
import unidadeRotas from './rotas/unidadeRotas'
import produtoRotas from './rotas/produtoRotas'
import estoqueRotas from './rotas/estoqueRotas'

const aplicacao = express()

aplicacao.use(cors())
aplicacao.use(express.json())
aplicacao.use(express.urlencoded({ extended: true }))

aplicacao.use('/auth', autenticacaoRotas)
aplicacao.use('/unidades', unidadeRotas)
aplicacao.use('/produtos', produtoRotas)
aplicacao.use('/estoque', estoqueRotas)

aplicacao.get('/saude', (requisicao, resposta) => {
  resposta.json({
    mensagem: 'Servidor Raízes do Nordeste funcionando!',
    horario: new Date().toISOString()
  })
})

const PORTA = process.env.PORTA || 3000

aplicacao.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`)
})

export default aplicacao