import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import autenticacaoRotas from './rotas/autenticacaoRotas'

dotenv.config()

const aplicacao = express()

aplicacao.use(cors())
aplicacao.use(express.json())

// Rotas
aplicacao.use('/auth', autenticacaoRotas)

// Rota de saúde
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