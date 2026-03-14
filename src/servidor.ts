import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

const aplicacao = express();

// Middlewares globais
aplicacao.use(cors());
aplicacao.use(express.json());

// Rota de teste para verificar se o servidor está funcionando
aplicacao.get('/saude', (requisicao, resposta) => {
  resposta.json({ 
    mensagem: 'Servidor Raízes do Nordeste funcionando!',
    horario: new Date().toISOString()
  });
});

// Porta do servidor
const PORTA = process.env.PORTA || 3000;

aplicacao.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});

export default aplicacao;